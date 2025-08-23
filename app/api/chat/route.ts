import { UIMessage, convertToModelMessages, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

import {
  MCPTransport,
  experimental_createMCPClient as createMCPClient,
} from 'ai';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const url = new URL('http://localhost:3000/mcp');
    const mcpClient = await createMCPClient({
      transport: new StreamableHTTPClientTransport(url, {
        sessionId: 'session_123',
      }),
    });

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: `You are a helpful travel assistant for Hyperfunnel, an AI-powered travel planning platform. You specialize in:
      
      - Hotel recommendations and bookings
      - Destination advice and travel planning
      - Itinerary creation and optimization
      - Travel tips and local insights
      - Budget planning for trips
      
      Always be helpful, friendly, and provide specific actionable advice. When recommending hotels or destinations, include relevant details like pricing ranges, amenities, and best times to visit.
      
      Keep responses concise but informative. If users ask about booking, mention that you can help them find options and they can book instantly through Hyperfunnel.`,
      messages: convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 1000,
      // tools: mcpTools,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
