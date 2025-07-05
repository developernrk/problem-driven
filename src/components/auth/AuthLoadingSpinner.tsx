'use client';

import React from 'react';
import { Target, Zap } from 'lucide-react';

interface AuthLoadingSpinnerProps {
  message?: string;
}

export const AuthLoadingSpinner: React.FC<AuthLoadingSpinnerProps> = ({ 
  message = "Authenticating..." 
}) => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div className="relative inline-flex items-center justify-center">
            <Target className="h-12 w-12 text-teal-600 animate-spin" style={{ animationDuration: '3s' }} />
            <Zap className="h-6 w-6 text-orange-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>

        {/* Loading Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {message}
          </h3>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-64 mx-auto">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 h-1 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoadingSpinner;