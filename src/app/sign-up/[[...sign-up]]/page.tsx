'use client';

import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Rocket, Star, Globe, UserPlus, Gift, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AuthLayout } from '@/components/auth/AuthLayout';

export default function Page() {
  const leftSideContent = (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Join the
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            {' '}Innovation
          </span>
          <br />Community
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
          Transform your ideas into reality with our comprehensive platform designed for entrepreneurs and innovators.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
            <Rocket className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Launch Your Ideas
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Access tools and resources to turn your innovative concepts into successful businesses.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
            <Star className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Premium Features
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              AI-powered market analysis and insights to validate your business ideas.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
            <Globe className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Global Network
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Connect with entrepreneurs, investors, and mentors worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* What You Get Section */}
      <div className="hidden bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Gift className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">What you get for free:</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Access to 10,000+ business ideas</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300">AI-powered market analysis and insights</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Monthly trend reports and updates</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Community access and networking</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">50K+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">10K+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Ideas Shared</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">95%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
        </div>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join the innovation community today - it's free!"
      backgroundGradient="from-emerald-50 via-teal-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
      leftSideContent={leftSideContent}
    >
      {/* Form Header Icon */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4">
          <UserPlus className="h-7 w-7 text-white" />
        </div>
      </div>

      {/* Clerk Sign Up Component */}
      <div className="relative">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm sm:text-base",
              card: "bg-white dark:bg-gray-800 shadow-2xl border-0 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 w-full",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 transition-all duration-200 hover:shadow-md text-sm sm:text-base",
              socialButtonsBlockButtonText:
                "font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base",
              formFieldInput:
                "border-2 border-gray-200 dark:border-gray-600 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all duration-200 text-sm sm:text-base",
              formFieldLabel:
                "font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base",
              dividerLine:
                "bg-gray-200 dark:bg-gray-600",
              dividerText:
                "text-gray-500 dark:text-gray-400 font-medium text-sm",
              footerActionLink:
                "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors duration-200 text-sm sm:text-base",
              identityPreviewText:
                "text-gray-700 dark:text-gray-300 text-sm sm:text-base",
              formResendCodeLink:
                "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium text-sm",
              otpCodeFieldInput:
                "border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 text-center",
              formFieldSuccessText:
                "text-emerald-600 dark:text-emerald-400 text-sm",
              formFieldErrorText:
                "text-red-600 dark:text-red-400 text-sm",
              identityPreviewEditButton:
                "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm",
              rootBox: "w-full",
              cardBox: "w-full shadow-none",
            },
            layout: {
              socialButtonsPlacement: "top",
              showOptionalFields: true,
            }
          }}
        />
      </div>

      {/* Terms and Privacy */}
      <div className="mt-4 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
          Privacy Policy
        </Link>
      </div>

      {/* Sign In Link */}
      <div className="mt-4 text-center">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 flex items-center justify-center space-x-4 sm:space-x-6 text-xs text-gray-400 dark:text-gray-500">
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-emerald-500" />
          <span>Secure</span>
        </div>
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-emerald-500" />
          <span>Free Forever</span>
        </div>
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-emerald-500" />
          <span>No Spam</span>
        </div>
      </div>
    </AuthLayout>
  );
}
