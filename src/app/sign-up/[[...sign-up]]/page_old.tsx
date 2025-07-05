'use client';

import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Target, Zap, ArrowLeft, Rocket, Star, Globe, UserPlus, Gift, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Page() {
  return (
    <div className="auth-container bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* Floating Elements - Hidden on mobile to prevent overflow */}
      <div className="hidden md:block absolute top-16 left-16 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="hidden md:block absolute top-32 right-16 w-32 h-32 bg-teal-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="hidden md:block absolute bottom-24 left-24 w-20 h-20 bg-cyan-200/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      <div className="hidden md:block absolute bottom-16 right-32 w-28 h-28 bg-green-200/20 rounded-full blur-xl animate-pulse delay-3000"></div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-full auth-scroll-container">
        {/* Left Side - Branding & Benefits */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-6 xl:px-12 py-8 relative">
          {/* Back to Home Button */}
          <div className="absolute top-6 left-6">
            <Link href="/">
              <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Logo */}
          <div className="mb-12">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Target className="h-10 w-10 text-emerald-600" />
                <Zap className="h-5 w-5 text-orange-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ProblemDriven
              </span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Gift className="h-3 w-3 mr-1" />
                  Free to Join
                </Badge>
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Start Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {' '}Innovation Journey
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                Join thousands of entrepreneurs and innovators transforming problems into profitable opportunities.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Launch Faster</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Skip months of research with our curated business ideas and market insights
                  </p>
                </div>
              </div>


              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Premium Resources</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Access exclusive templates, guides, and AI-powered business analysis
                  </p>
                </div>
              </div>
            </div>

            {/* What You Get */}
            {/*<div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">*/}
            {/*  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">*/}
            {/*    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />*/}
            {/*    What you get for free:*/}
            {/*  </h3>*/}
            {/*  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">*/}
            {/*    <div className="flex items-center space-x-2">*/}
            {/*      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />*/}
            {/*      <span>Access to 10,000+ curated business ideas</span>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center space-x-2">*/}
            {/*      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />*/}
            {/*      <span>AI-powered market analysis and insights</span>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center space-x-2">*/}
            {/*      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />*/}
            {/*      <span>Monthly trend reports and updates</span>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">1K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 py-8 lg:py-12 relative">
          {/* Mobile Back Button */}
          <div className="absolute top-4 left-4 lg:hidden z-20">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>

          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-6 mt-12">
              <Link href="/" className="inline-flex items-center space-x-2">
                <div className="relative">
                  <Target className="h-8 w-8 text-emerald-600" />
                  <Zap className="h-4 w-4 text-orange-500 absolute -top-1 -right-1" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ProblemDriven
                </span>
              </Link>
            </div>

            {/* Form Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4">
                <UserPlus className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Your Account
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Join the innovation community today - it's free!
              </p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
