'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AuthSuccessProps {
  type?: 'signin' | 'signup';
  redirectTo?: string;
  autoRedirect?: boolean;
  autoRedirectDelay?: number;
  userName?: string;
}

export const AuthSuccess: React.FC<AuthSuccessProps> = ({
  type = 'signin',
  redirectTo = '/',
  autoRedirect = true,
  autoRedirectDelay = 3000,
  userName,
}) => {
  const [countdown, setCountdown] = useState(Math.floor(autoRedirectDelay / 1000));
  const router = useRouter();

  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push(redirectTo);
          
return 0;
        }
        
return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRedirect, autoRedirectDelay, redirectTo, router]);

  const handleContinue = () => {
    router.push(redirectTo);
  };

  const isSignUp = type === 'signup';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-teal-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-28 h-28 bg-cyan-200/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-6 relative">
            <CheckCircle className="h-10 w-10 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-ping opacity-20"></div>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <Target className="h-6 w-6 text-teal-600" />
              <Zap className="h-3 w-3 text-orange-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ProblemDriven
            </span>
          </div>

          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {isSignUp ? 'Welcome to ProblemDriven!' : 'Welcome Back!'}
          </CardTitle>
          
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {isSignUp 
              ? `${userName ? `Hi ${userName}! ` : ''}Your account has been created successfully. Get ready to explore innovative business ideas!`
              : `${userName ? `Hi ${userName}! ` : ''}You've been signed in successfully. Continue your innovation journey.`
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Success Features */}
          <div className="space-y-3">
            {isSignUp ? (
              <>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>Access to 10,000+ business ideas</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>AI-powered market insights</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>Community networking access</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <Sparkles className="h-4 w-4 text-teal-500 flex-shrink-0" />
                  <span>Your session is now active</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <Sparkles className="h-4 w-4 text-teal-500 flex-shrink-0" />
                  <span>All features are available</span>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
            >
              {isSignUp ? 'Start Exploring Ideas' : 'Continue to Dashboard'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            {autoRedirect && countdown > 0 && (
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Redirecting automatically in {countdown} second{countdown !== 1 ? 's' : ''}...
              </div>
            )}
          </div>

          {/* Additional Links */}
          <div className="flex justify-center space-x-4 text-sm">
            <Link 
              href="/dashboard" 
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link 
              href="/profile" 
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
            >
              Profile
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link 
              href="/help" 
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
            >
              Help
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthSuccess;