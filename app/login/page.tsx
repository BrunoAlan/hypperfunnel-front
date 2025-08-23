'use client';

import { Button } from '@/components/ui/button';
import { Plane, MessageCircle, Building2, Zap } from 'lucide-react';

export default function LoginPage() {
  const handleStartPlanning = () => {
    // Handle navigation to main app or login flow
    console.log('Start planning clicked');
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-sm mx-auto'>
        {/* Phone-like container */}
        <div className='bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 relative'>
          {/* Logo and Branding */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-2xl mb-6'>
              <Plane className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Hyperfunnel
            </h1>
            <p className='text-gray-500 text-lg'>Your AI Travel Assistant</p>
          </div>

          {/* Features List */}
          <div className='space-y-6 mb-8'>
            <div className='flex items-start space-x-4'>
              <div className='flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center'>
                <MessageCircle className='w-6 h-6 text-gray-600' />
              </div>
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
              <div className='flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center'>
                <Building2 className='w-6 h-6 text-gray-600' />
              </div>
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
              <div className='flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center'>
                <Zap className='w-6 h-6 text-gray-600' />
              </div>
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
              className='w-full h-14 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg rounded-2xl transition-colors'
            >
              Start Planning Your Trip
            </Button>
            <p className='text-center text-gray-400 text-sm'>
              Find hotels, compare prices, and book instantly
            </p>
          </div>

          {/* Page Indicators */}
          <div className='flex justify-center space-x-2 mt-8'>
            <div className='w-2 h-2 bg-gray-900 rounded-full'></div>
            <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
            <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
