import { Destinations } from '@/components/destinations';
import { Response } from '@/components/ai-elements/response';

// Base types for tools
export interface ToolConfig {
  component: React.ComponentType<any>;
  loadingMessage: string;
  errorMessage: (error?: string) => string;
  extractData: (output: any) => any;
  // Option to show text along with the tool (default: false for backward compatibility)
  showTextWithTool?: boolean;
}

// Available tools registry
export const TOOL_REGISTRY: Record<string, ToolConfig> = {
  get_available_destinations: {
    component: Destinations,
    loadingMessage: 'Loading available destinations...',
    errorMessage: (error) =>
      `Error loading destinations: ${error || 'Unknown error'}`,
    extractData: (output) => ({
      destinations: output?.structuredContent?.content || [],
    }),
    showTextWithTool: true,
  },

  // To add more tools, simply add new entries here:
  // 'get_flights': {
  //   component: Flights,
  //   loadingMessage: 'Searching flights...',
  //   errorMessage: (error) => `Error searching flights: ${error || 'Unknown error'}`,
  //   extractData: (output) => ({ flights: output?.flights || [] })
  // },
};

export interface ToolPart {
  type: string;
  toolName?: string;
  state?: 'input-available' | 'output-available' | 'output-error';
  output?: any;
  errorText?: string;
}

export interface MessagePart {
  type: string;
  text?: string;
  [key: string]: any;
}

export function useToolRenderer() {
  const renderTool = (parts: MessagePart[]): React.ReactNode | null => {
    // Look for tools with available output (priority)
    for (const part of parts) {
      if (
        part.type === 'dynamic-tool' &&
        'toolName' in part &&
        'state' in part
      ) {
        const toolPart = part as ToolPart;
        const toolConfig = TOOL_REGISTRY[toolPart.toolName!];

        if (
          toolConfig &&
          toolPart.state === 'output-available' &&
          toolPart.output
        ) {
          try {
            const Component = toolConfig.component;
            const data = toolConfig.extractData(toolPart.output);
            // Render tool immediately without any delays
            return <Component {...data} />;
          } catch (error) {
            return <div>Error rendering tool: {toolPart.toolName}</div>;
          }
        }
      }
    }

    // Look for tools in loading or error states
    for (const part of parts) {
      if (
        part.type === 'dynamic-tool' &&
        'toolName' in part &&
        'state' in part
      ) {
        const toolPart = part as ToolPart;
        const toolConfig = TOOL_REGISTRY[toolPart.toolName!];

        if (toolConfig) {
          switch (toolPart.state) {
            case 'input-available':
              return <div>{toolConfig.loadingMessage}</div>;
            case 'output-error':
              return <div>{toolConfig.errorMessage(toolPart.errorText)}</div>;
          }
        }
      }
    }

    return null;
  };

  // New function to render both text and tools
  const renderTextAndTools = (parts: MessagePart[]): React.ReactNode => {
    const textParts = parts.filter((part) => part.type === 'text');
    const toolContent = renderTool(parts);

    // When there are tools, render text immediately without streaming to ensure simultaneous display
    return (
      <div className='space-y-2'>
        {textParts.map((part, index) => (
          <div key={`text-${index}`} className='text-foreground text-sm'>
            {part.text}
          </div>
        ))}
        {toolContent && toolContent}
      </div>
    );
  };

  // Check if there are any tools in the parts
  const hasTool = (parts: MessagePart[]): boolean => {
    return parts.some(
      (part) =>
        part.type === 'dynamic-tool' && 'toolName' in part && 'state' in part
    );
  };

  // Check if any tool in the message should show text along with it
  const shouldShowTextWithTool = (parts: MessagePart[]): boolean => {
    for (const part of parts) {
      if (
        part.type === 'dynamic-tool' &&
        'toolName' in part &&
        'state' in part
      ) {
        const toolPart = part as ToolPart;
        const toolConfig = TOOL_REGISTRY[toolPart.toolName!];

        if (toolConfig?.showTextWithTool) {
          return true;
        }
      }
    }
    return false;
  };

  // Smart render function that chooses the appropriate rendering strategy
  const renderContent = (parts: MessagePart[]): React.ReactNode => {
    if (hasTool(parts)) {
      // Always render text and tools together for better UX
      return renderTextAndTools(parts);
    }

    // Fallback to text content only
    return parts
      .filter((part) => part.type === 'text')
      .map((part, index) => (
        <Response key={`text-${index}`}>{part.text}</Response>
      ));
  };

  return {
    renderTool,
    renderTextAndTools,
    hasTool,
    shouldShowTextWithTool,
    renderContent,
  };
}
