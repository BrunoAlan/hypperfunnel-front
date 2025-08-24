import { Destinations } from '@/components/destinations';

// Base types for tools
export interface ToolConfig {
  component: React.ComponentType<any>;
  loadingMessage: string;
  errorMessage: (error?: string) => string;
  extractData: (output: any) => any;
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

  return { renderTool };
}
