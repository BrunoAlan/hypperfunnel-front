'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plane, MessageCircle, Building2, Zap } from 'lucide-react';

export default function Home() {
  const handleStartPlanning = () => {
    // Handle navigation to main app or login flow
    console.log('Start planning clicked');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      {/* Desktop Layout */}
      <div className='hidden lg:flex min-h-screen'>
        {/* Left Side - Hero Content */}
        <div className='flex-1 flex items-center justify-center p-12'>
          <div className='max-w-lg'>
            <div className='mb-8'>
              <Avatar className='w-24 h-24 mb-8'>
                <AvatarFallback className='bg-gray-900 text-white text-3xl'>
                  <Plane className='w-12 h-12' />
                </AvatarFallback>
              </Avatar>
              <Badge variant='secondary' className='mb-4'>
                AI-Powered Travel Platform
              </Badge>
              <h1 className='text-5xl font-bold text-gray-900 mb-4'>
                Hyperfunnel
              </h1>
              <p className='text-xl text-gray-600 mb-8'>
                Your AI Travel Assistant
              </p>
              <p className='text-lg text-gray-500 leading-relaxed'>
                Discover perfect hotels through smart conversations, curated
                recommendations, and instant booking - all powered by AI to make
                your travel planning effortless.
              </p>
            </div>

            <Button
              onClick={handleStartPlanning}
              size='lg'
              className='h-16 px-8 text-xl rounded-2xl'
            >
              Start Planning Your Trip
            </Button>
            <p className='text-gray-400 mt-4'>
              Find hotels, compare prices, and book instantly
            </p>
          </div>
        </div>

        {/* Right Side - Features Card */}
        <div className='flex-1 flex items-center justify-center p-12'>
          <Card className='max-w-md w-full'>
            <CardHeader>
              <CardTitle className='text-2xl text-center'>
                Why Choose Hyperfunnel?
              </CardTitle>
              <CardDescription className='text-center'>
                Experience the future of travel planning
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-8'>
              <div className='flex items-start space-x-4'>
                <Avatar className='w-14 h-14'>
                  <AvatarFallback className='bg-blue-100 text-blue-600'>
                    <MessageCircle className='w-7 h-7' />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2 text-lg'>
                    Smart Conversations
                  </h3>
                  <p className='text-gray-600'>
                    Chat naturally to find your perfect hotel with AI-powered
                    recommendations
                  </p>
                  <Badge variant='outline' className='mt-2'>
                    AI-Powered
                  </Badge>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <Avatar className='w-14 h-14'>
                  <AvatarFallback className='bg-green-100 text-green-600'>
                    <Building2 className='w-7 h-7' />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2 text-lg'>
                    Best Hotels
                  </h3>
                  <p className='text-gray-600'>
                    Curated options that match your preferences and budget
                    perfectly
                  </p>
                  <Badge variant='outline' className='mt-2'>
                    Curated
                  </Badge>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <Avatar className='w-14 h-14'>
                  <AvatarFallback className='bg-purple-100 text-purple-600'>
                    <Zap className='w-7 h-7' />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2 text-lg'>
                    Instant Booking
                  </h3>
                  <p className='text-gray-600'>
                    Book in seconds with personalized recommendations and
                    real-time availability
                  </p>
                  <Badge variant='outline' className='mt-2'>
                    Lightning Fast
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden min-h-screen flex items-center justify-center p-4'>
        <div className='w-full max-w-sm mx-auto'>
          <Card className='relative'>
            <CardHeader className='text-center pb-6'>
              <Avatar className='w-20 h-20 mx-auto mb-6'>
                <AvatarFallback className='bg-gray-900 text-white'>
                  <Plane className='w-10 h-10' />
                </AvatarFallback>
              </Avatar>
              <Badge variant='secondary' className='mb-4'>
                AI Travel Assistant
              </Badge>
              <CardTitle className='text-3xl mb-2'>Hyperfunnel</CardTitle>
              <CardDescription className='text-lg'>
                Your AI Travel Assistant
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-6'>
              {/* Features List */}
              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <Avatar className='w-12 h-12'>
                    <AvatarFallback className='bg-blue-100 text-blue-600'>
                      <MessageCircle className='w-6 h-6' />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>
                      Smart Conversations
                    </h3>
                    <p className='text-gray-500 text-sm'>
                      Chat naturally to find your perfect hotel
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <Avatar className='w-12 h-12'>
                    <AvatarFallback className='bg-green-100 text-green-600'>
                      <Building2 className='w-6 h-6' />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>
                      Best Hotels
                    </h3>
                    <p className='text-gray-500 text-sm'>
                      Curated options that match your preferences
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <Avatar className='w-12 h-12'>
                    <AvatarFallback className='bg-purple-100 text-purple-600'>
                      <Zap className='w-6 h-6' />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>
                      Instant Booking
                    </h3>
                    <p className='text-gray-500 text-sm'>
                      Book in seconds with personalized recommendations
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className='space-y-4'>
                <Button
                  onClick={handleStartPlanning}
                  size='lg'
                  className='w-full h-14 text-lg rounded-2xl'
                >
                  Start Planning Your Trip
                </Button>
                <p className='text-center text-gray-400 text-sm'>
                  Find hotels, compare prices, and book instantly
                </p>
              </div>

              {/* Page Indicators */}
              <div className='flex justify-center space-x-2 pt-4'>
                <div className='w-2 h-2 bg-gray-900 rounded-full'></div>
                <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
                <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
