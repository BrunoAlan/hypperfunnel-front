# Scalable Tools System

This system allows you to add new AI tools easily and scalably without modifying the main chat logic.

## 🎯 How It Works

### 1. **Central Hook (`useToolRenderer`)**
- Automatically handles rendering of all tools
- Detects states: `loading`, `success`, `error`
- Prioritizes tools over text content

### 2. **Tools Registry (`TOOL_REGISTRY`)**
- Maps tool names to their configurations
- Defines components, messages, and data extractors

## 🚀 How to Add a New Tool

### Step 1: Create the Component
```tsx
// components/flights.tsx
type FlightsProps = {
  flights: Flight[];
};

export const Flights = ({ flights }: FlightsProps) => {
  return (
    <div className='space-y-3'>
      <h3 className='font-semibold text-gray-900'>Available Flights:</h3>
      {flights.map((flight, idx) => (
        <div key={idx} className='bg-gray-50 p-3 rounded-lg'>
          ✈️ {flight.airline} - ${flight.price}
        </div>
      ))}
    </div>
  );
};
```

### Step 2: Register in the System
```tsx
// hooks/use-tool-renderer.tsx
import { Flights } from '@/components/flights';

export const TOOL_REGISTRY: Record<string, ToolConfig> = {
  // ... other tools
  
  'get_flights': {
    component: Flights,
    loadingMessage: 'Searching flights...',
    errorMessage: (error) => `Error searching flights: ${error || 'Unknown error'}`,
    extractData: (output) => ({
      flights: output?.structuredContent?.flights || output?.flights || []
    })
  }
};
```

### And that's it! 🎉

The tool automatically:
- ✅ Renders when ready
- ✅ Shows loading message
- ✅ Handles errors appropriately
- ✅ Integrates with existing chat

## 📋 Currently Supported Tools

| Tool | Component | Status |
|------|-----------|--------|
| `get_available_destinations` | `Destinations` | ✅ Active |

## 🔧 System Advantages

### **Scalability**
- Adding new tools requires only 2 steps
- No need to modify chat logic
- Automatic support for loading/error states

### **Maintainability**
- Each tool lives in its own component
- Centralized configuration easy to find
- Clear separation of responsibilities

### **Consistency**
- All tools follow the same pattern
- Unified state handling
- Coherent user experience

### **Flexibility**
- Each tool can have its own data extraction logic
- Customizable messages
- Fully customizable components

## 🎨 Usage Examples

```tsx
// The hook handles everything automatically
const { renderTool } = useToolRenderer();

// In your chat component:
const toolContent = renderTool(message.parts);
if (toolContent) {
  return toolContent; // Renders the appropriate tool
}

// If no tools, show normal text
return <TextContent />;
```

## 🔄 Automatically Handled States

1. **`input-available`**: Shows loading message
2. **`output-available`**: Renders component with data
3. **`output-error`**: Shows custom error message

The system prioritizes successful tools, then loading/error states, and finally text content.
