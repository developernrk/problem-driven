'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { Lightbulb, Users, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';

export default function Page() {
  const leftSideContent = (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Welcome Back to
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
            {' '}Innovation
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
          Continue your journey of discovering groundbreaking business ideas and connecting with fellow innovators.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
            <Lightbulb className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Discover Ideas
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Access thousands of validated business ideas across various industries and markets.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Connect & Collaborate
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Network with entrepreneurs, investors, and innovators from around the world.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Market Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get real-time market analysis and trends to make informed business decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">50K+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Business Ideas</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">95%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
        </div>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your innovation journey"
      backgroundGradient="from-teal-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
      leftSideContent={leftSideContent}
    >
      {/* Form Header Icon */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mb-4">
          <Shield className="h-7 w-7 text-white" />
        </div>
      </div>

      {/* Clerk Sign In Component */}
      <div className="relative">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm sm:text-base",
              card: "bg-white dark:bg-gray-800 shadow-2xl border-0 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 w-full",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: 
                "border-2 border-gray-200 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-500 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 transition-all duration-200 hover:shadow-md text-sm sm:text-base",
              socialButtonsBlockButtonText: 
                "font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base",
              formFieldInput: 
                "border-2 border-gray-200 dark:border-gray-600 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 transition-all duration-200 text-sm sm:text-base",
              formFieldLabel: 
                "font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base",
              dividerLine: 
                "bg-gray-200 dark:bg-gray-600",
              dividerText: 
                "text-gray-500 dark:text-gray-400 font-medium text-sm",
              footerActionLink: 
                "text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors duration-200 text-sm sm:text-base",
              identityPreviewText: 
                "text-gray-700 dark:text-gray-300 text-sm sm:text-base",
              formResendCodeLink: 
                "text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium text-sm",
              otpCodeFieldInput: 
                "border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 text-center",
              rootBox: "w-full",
              cardBox: "w-full shadow-none",
            },
            layout: {
              socialButtonsPlacement: "top",
              showOptionalFields: false,
            }
          }}
        />
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Secure authentication powered by Clerk</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="mt-4 text-center">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link 
            href="/sign-up" 
            className="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors duration-200"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}