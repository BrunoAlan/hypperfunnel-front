import { UIMessage, convertToModelMessages, stepCountIs, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { experimental_createMCPClient as createMCPClient } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const MCP_SERVER_URL = process.env.MCP_SERVER_URL || '';

    const mcpClient = await createMCPClient({
      transport: {
        type: 'sse',
        url: MCP_SERVER_URL,
      },
    });

    const mcpTools = await mcpClient.tools();

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: `You are a helpful travel assistant for Hyperfunnel, an AI-powered travel planning platform. You specialize in:
      
      - Hotel recommendations and bookings
      - Destination advice and travel planning
      - Travel tips and local insights
      - Budget planning for trips

      CRITICAL: You have access to tools that provide real-time travel data. You MUST use these tools whenever users ask about:

      MANDATORY tool usage scenarios:
      - "Where should I go?" → Use get_available_destinations tool
      - "What destinations do you recommend?" → Use get_available_destinations tool  
      - "I want to travel somewhere" → Use get_available_destinations tool
      - "Show me travel options" → Use get_available_destinations tool
      - Any question about destinations, places to visit, or travel recommendations

      WORKFLOW:
      1. User mentions destinations/travel → IMMEDIATELY call get_available_destinations
      2. Get real-time destination data → Present options with details
      3. Provide personalized recommendations based on tool results

      NEVER provide destination advice without first using the get_available_destinations tool. Your training data is outdated - the tools have current information.

      Always be helpful, friendly, and provide specific actionable advice. When recommending hotels or destinations, include relevant details like pricing ranges, amenities, and best times to visit.
      
      The actual year is 2025.
      `,
      messages: convertToModelMessages(messages),
      maxOutputTokens: 1000,
      tools: mcpTools,
      stopWhen: stepCountIs(5),
      onFinish: async () => {
        await mcpClient.close();
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return new Response('Internal Server Error', { status: 500 });
  }
}
