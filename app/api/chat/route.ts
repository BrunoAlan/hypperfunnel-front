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

      Use the tools at your disposal to gather information and provide the best recommendations.

      Always be helpful, friendly, and provide specific actionable advice. When recommending hotels or destinations, include relevant details like pricing ranges, amenities, and best times to visit.
      
      The actual year is 2025.
      `,
      messages: convertToModelMessages(messages),
      maxOutputTokens: 1000,
      tools: mcpTools,
      stopWhen: stepCountIs(10),
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
