'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backgroundGradient?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  leftSideContent?: React.ReactNode;
  showMobileLogo?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  backgroundGradient = "from-teal-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700",
  showBackButton = true,
  backButtonText = "Back to Home",
  backButtonHref = "/",
  leftSideContent,
  showMobileLogo = true,
}) => {
  return (
    <div className={`auth-container bg-gradient-to-br ${backgroundGradient} relative`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* Floating Elements - Hidden on mobile to prevent overflow */}
      <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-teal-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="hidden md:block absolute top-40 right-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-24 h-24 bg-indigo-200/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-full auth-scroll-container">
        {/* Left Side - Branding & Content */}
        {leftSideContent && (
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-6 xl:px-12 py-8 relative">
            {/* Back Button */}
            {showBackButton && (
              <div className="absolute top-6 left-6">
                <Link href={backButtonHref}>
                  <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {backButtonText}
                  </Button>
                </Link>
              </div>
            )}

            {/* Logo */}
            <div className="mb-12">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Target className="h-10 w-10 text-teal-600" />
                  <Zap className="h-5 w-5 text-orange-500 absolute -top-1 -right-1" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ProblemDriven
                </span>
              </Link>
            </div>

            {/* Custom Left Content */}
            {leftSideContent}
          </div>
        )}

        {/* Right Side - Form */}
        <div className={`w-full ${leftSideContent ? 'lg:w-1/2' : ''} flex items-center justify-center px-4 sm:px-6 py-8 lg:py-12 relative`}>
          {/* Mobile Back Button */}
          {showBackButton && (
            <div className="absolute top-4 left-4 lg:hidden z-20">
              <Link href={backButtonHref}>
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          )}

          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            {showMobileLogo && (
              <div className="lg:hidden text-center mb-6 mt-12">
                <Link href="/" className="inline-flex items-center space-x-2">
                  <div className="relative">
                    <Target className="h-8 w-8 text-teal-600" />
                    <Zap className="h-4 w-4 text-orange-500 absolute -top-1 -right-1" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ProblemDriven
                  </span>
                </Link>
              </div>
            )}

            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
