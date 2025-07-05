'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import {
  Search,
  Menu,
  X,
  Target,
  Star,
  Trophy,
  MessageCircle,
  Globe,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ModeSwitcher } from '@/components/mode-switcher';
import SearchDropdown from '@/components/ui/search-dropdown';

interface NavigationProps {
  onSearch?: (query: string) => void;
  browniePoints?: number;
  viewsRemaining?: number;
  userData?: {
    isPremium: boolean;
    viewsRemaining: number;
  } | null;
  onShowSubscriptionPrompt?: () => void;
}

export default function Navigation({
  onSearch,
  browniePoints = 0,
  viewsRemaining = 6,
  userData,
  onShowSubscriptionPrompt
}: NavigationProps) {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Target className="h-8 w-8 text-teal-600" />
              <Zap className="h-4 w-4 text-orange-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ProblemDriven
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchDropdown
              onSearch={onSearch}
              placeholder="Search Idea..."
              className="w-full"
              userData={userData}
              onShowSubscriptionPrompt={onShowSubscriptionPrompt}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
              {/* Navigation Links */}
              <Link href="/explore">
                  <Button variant="ghost" size="sm">
                      <Search className="h-4 w-4 mr-1" />
                      Explore
                  </Button>
              </Link>
                {/* User Stats */}
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Trophy className="h-3 w-3" />
                    <span>{browniePoints}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span  className={"truncate"}>{viewsRemaining} views left</span>
                  </Badge>
                </div>

                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>

                <Link href="/chat">
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    AI Chat
                  </Button>
                </Link>

                {/*<Button variant="ghost" size="sm">*/}
                {/*  <Globe className="h-4 w-4 mr-1" />*/}
                {/*  EN*/}
                {/*</Button>*/}

                <ModeSwitcher />

                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8"
                    }
                  }}
                />
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <ModeSwitcher />
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchDropdown
            onSearch={onSearch}
            placeholder="Search Idea..."
            className="w-full"
            userData={userData}
            onShowSubscriptionPrompt={onShowSubscriptionPrompt}
          />
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <div className="flex flex-col space-y-3">
              {isSignedIn ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Welcome, {user?.firstName || 'User'}!
                    </span>
                    <div className="flex space-x-2">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Trophy className="h-3 w-3" />
                        <span>{browniePoints}</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{viewsRemaining}</span>
                      </Badge>
                    </div>
                  </div>

                  <Link href="/explore" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Search className="h-4 w-4 mr-2" />
                      Explore
                    </Button>
                  </Link>

                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>

                  <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      AI Chat
                    </Button>
                  </Link>

                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Language: English
                  </Button>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                    <ModeSwitcher />
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                    <ModeSwitcher />
                  </div>
                  <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
