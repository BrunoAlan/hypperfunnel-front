'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Response } from '@/components/ai-elements/response';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plane, ArrowLeft, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import Link from 'next/link';

export default function TravelAssistantPage() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
      setInput('');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      {/* Header */}
      <div className='border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10'>
        <div className='max-w-4xl mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href='/'>
              <Button variant='ghost' size='sm'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back
              </Button>
            </Link>
            <div className='flex items-center space-x-3'>
              <Avatar className='w-10 h-10'>
                <AvatarFallback className='bg-gray-900 text-white'>
                  <Plane className='w-5 h-5' />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className='font-semibold text-gray-900'>
                  Travel Assistant
                </h1>
                <p className='text-sm text-gray-500'>
                  AI-powered travel planning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className='max-w-4xl mx-auto p-4 sm:p-6'>
        <Card className='h-[calc(100vh-200px)] flex flex-col'>
          <CardHeader className='border-b flex-shrink-0'>
            <CardTitle className='text-lg'>
              How can I help you plan your trip today?
            </CardTitle>
            <div className='flex flex-wrap gap-2 mt-4'>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setInput('I need help finding hotels in Paris for next week')
                }
              >
                Find hotels in Paris
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setInput(
                    'What are the best destinations for a beach vacation?'
                  )
                }
              >
                Beach destinations
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setInput('Help me plan a 5-day itinerary for Tokyo')
                }
              >
                Tokyo itinerary
              </Button>
            </div>
          </CardHeader>

          <CardContent className='flex-1 flex flex-col p-0'>
            <div className='flex-1 relative'>
              <Conversation
                className='absolute inset-0'
                key={`conversation-${messages.length}`}
              >
                <ConversationContent className='p-6'>
                  {messages.length === 0 && (
                    <div className='flex items-center justify-center h-full'>
                      <div className='text-center'>
                        <Avatar className='w-16 h-16 mx-auto mb-4'>
                          <AvatarFallback className='bg-blue-100 text-blue-600'>
                            <MessageCircle className='w-8 h-8' />
                          </AvatarFallback>
                        </Avatar>
                        <h3 className='font-semibold text-gray-900 mb-2'>
                          Start your conversation
                        </h3>
                        <p className='text-gray-500 text-sm max-w-sm'>
                          Ask me anything about travel planning, hotel
                          recommendations, or destination advice.
                        </p>
                      </div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <Message from={message.role} key={`${message.id}`}>
                      <MessageContent>
                        {message.parts
                          .filter((part) => part.type === 'text')
                          .map((part, i) => (
                            <Response key={`${message.id}-${i}`}>
                              {part.text}
                            </Response>
                          ))}
                      </MessageContent>
                    </Message>
                  ))}

                  {/* Loading indicator - Show feedback during streaming */}
                  {status === 'streaming' && (
                    <Message from='assistant'>
                      <MessageContent>
                        <div className='flex items-center space-x-2 text-gray-500'>
                          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
                          <span>Thinking...</span>
                        </div>
                      </MessageContent>
                    </Message>
                  )}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </div>

            {/* Input Area */}
            <div className='border-t p-4 bg-gray-50/50'>
              <PromptInput
                onSubmit={handleSubmit}
                className='w-full max-w-3xl mx-auto relative'
              >
                <PromptInputTextarea
                  value={input}
                  placeholder='Ask me about hotels, destinations, or travel planning...'
                  onChange={(e) => setInput(e.currentTarget.value)}
                  className='pr-12 min-h-[44px] rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                />
                <PromptInputSubmit
                  status={status === 'streaming' ? 'streaming' : 'ready'}
                  disabled={!input.trim() || status === 'streaming'}
                  className='absolute bottom-2 right-2 rounded-lg'
                  onClick={() => {
                    if (input.trim()) {
                      sendMessage({
                        role: 'user',
                        parts: [{ type: 'text', text: input }],
                      });
                      setInput('');
                    }
                  }}
                />
              </PromptInput>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
