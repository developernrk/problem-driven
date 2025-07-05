'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Navigation from '@/components/layout/Navigation';

import SubscriptionPrompt from '@/components/subscription/SubscriptionPrompt';

import Footer from '@/components/layout/Footer';
import { User as UserType } from '@/types';
import {
  Search,
  Target,
  TrendingUp,
  Zap,
  Users,
  Building,
  Heart,
  Briefcase,
  Globe2,
  ArrowRight,
  MessageSquare,
  Filter,
  Brain,
  FileText,
  BarChart3,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { BackToTopButton, SmoothScrollLink, NavigationDots, ScrollProgressBar } from '@/components/ui/scroll-components';

export default function HomePage() {
  const { isSignedIn, user } = useUser();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);

  const router = useRouter();
  const { scrollToElement } = useSmoothScroll({
    offset: 80, // Account for fixed header
    autoHandleHash: true,
  });

  useEffect(() => {
    if (isSignedIn) {
      fetchUserData();
    }
  }, [isSignedIn]);



  const fetchUserData = async () => {
    try {
        console.log("USER DATA ::")
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        console.log("USER DATA ::",data.user)
        setUserData(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };



  const ideaCategories = [
    { name: 'Social Impact Ideas', count: 1250, trend: '+25%', icon: Heart, color: 'text-red-500' },
    { name: 'Business Solutions', count: 980, trend: '+18%', icon: Briefcase, color: 'text-blue-500' },
    { name: 'Community Ideas', count: 750, trend: '+22%', icon: Users, color: 'text-green-500' },
    { name: 'Urban Innovation', count: 650, trend: '+15%', icon: Building, color: 'text-purple-500' },
    { name: 'Global Solutions', count: 520, trend: '+30%', icon: Globe2, color: 'text-teal-500' },
    { name: 'Tech Innovation', count: 480, trend: '+20%', icon: Zap, color: 'text-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation
        browniePoints={userData?.browniePoints}
        viewsRemaining={userData?.viewsRemaining}
        userData={userData ? {
          isPremium: userData.isPremium,
          viewsRemaining: userData.viewsRemaining
        } : null}
        onShowSubscriptionPrompt={() => setShowSubscriptionPrompt(true)}
      />

      {/* Scroll Progress Bar */}
      {/*<ScrollProgressBar />*/}

      {/* Hero Section */}
      <div id="hero" className="bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden scroll-snap-section">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 relative">
          <div className="text-center">
            {/* Main Heading - Responsive Typography */}
            <div className="flex items-center justify-center mb-6">
              <Target className="h-12 w-12 sm:h-16 sm:w-16 text-orange-400 mr-4" />
              <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-300" />
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Explore <span className="text-orange-300">Ideas</span>
              <br className="hidden xs:block" />
              <span className="xs:hidden"> </span>Born from <span className="text-yellow-300">Real Problems</span>
            </h1>

            {/* Subtitle - Responsive */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-teal-100 max-w-4xl mx-auto px-2">
              A platform for discovering innovative ideas rooted in real-world challenges and opportunities
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center"
              >
               <>
                   <ShimmerButton className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Browse Ideas
                  </span>
                       <ArrowRight className="text-white ml-2 h-5 w-5" />
                   </ShimmerButton>
               </>
              </Link>

              <SmoothScrollLink
                targetId="how-it-works"
                className="inline-flex items-center justify-center"
              >
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    How It Works
                  </span>
                </ShimmerButton>
              </SmoothScrollLink>

              <SmoothScrollLink
                targetId="about"
                className="inline-flex items-center justify-center"
              >
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Learn More About Us
                  </span>
                </ShimmerButton>
              </SmoothScrollLink>
            </div>

            {/* Idea Categories Preview - Fully Responsive Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
              {ideaCategories.map((category, index) => {
                const IconComponent = category.icon;
                
return (
                  <Link
                    key={index}
                    href="/explore"
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 hover:bg-white/20 transition-all cursor-pointer group border border-white/20 block"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${category.color.replace('text-', 'text-')} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold group-hover:scale-105 transition-transform">
                      {category.count}
                    </div>
                    <div className="text-xs sm:text-sm text-teal-100 mt-1 leading-tight">
                      {category.name}
                    </div>
                    <div className="text-xs text-green-300 flex items-center justify-center mt-1 sm:mt-2">
                      <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>{category.trend}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Purpose Section */}
      <div id="about" className="bg-white dark:bg-gray-800 py-12 sm:py-16 scroll-snap-section">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Where Real Problems Meet Creative Solutions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Our platform connects problem-solvers with real-world challenges. Every idea you'll discover here
            stems from genuine problems faced by individuals, communities, and organizations. Explore innovative
            solutions, contribute your insights, and be part of a community that turns obstacles into opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="text-center">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Discover</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Browse ideas born from real challenges</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Connect</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Link problems with innovative solutions</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Impact</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Create meaningful change in the world</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 py-20 sm:py-24 scroll-snap-section overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our AI-powered platform transforms real-world problems into
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold"> actionable business opportunities</span>
            </p>
          </div>

          {/* Enhanced Process Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="relative h-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-800 dark:via-purple-800 dark:to-green-800 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full animate-pulse opacity-50"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
              {/* Step 1: Enhanced Problem Analysis */}
              <div className="group relative">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-200/50 dark:border-blue-800/50">
                  {/* Animated Icon Container */}
                  <div className="relative mb-8">
                    <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-12 w-12 text-white" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                      1
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Real-World Problem Analysis
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                      We continuously analyze real-world problems and frustrations from platforms like Reddit, Quora, and Twitter/X to identify genuine challenges people face daily.
                    </p>

                    {/* Enhanced Platform Badges */}
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        🔍 Reddit Analysis
                      </div>
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        💡 Quora Insights
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        📊 Twitter/X Trends
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mt-4">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Problems Analyzed Daily</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Enhanced AI Filtering */}
              <div className="group relative">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-200/50 dark:border-purple-800/50">
                  {/* Animated Icon Container */}
                  <div className="relative mb-8">
                    <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Brain className="h-12 w-12 text-white animate-pulse" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                      2
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      AI-Powered Filtering & Analysis
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                      Our advanced AI algorithms filter and analyze these problems to identify viable business opportunities with real market potential.
                    </p>

                    {/* Enhanced AI Features */}
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        🤖 Smart Filtering
                      </div>
                      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        🧠 Pattern Recognition
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        ⚡ Viability Assessment
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 mt-4">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">95%</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Accuracy Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Enhanced Solution Development */}
              <div className="group relative">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-200/50 dark:border-green-800/50">
                  {/* Animated Icon Container */}
                  <div className="relative mb-8">
                    <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-12 w-12 text-white" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-400 to-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                      3
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      Comprehensive Solution Development
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                        We provide detailed solutions with clear problem insights, market analysis, target audience, and actionable growth strategies and execution plans.
                    </p>

                    {/* Enhanced Solution Features */}
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        📈 Market Analysis
                      </div>
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        🎯 Target Audience
                      </div>
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        🚀 Implementation Plan
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 mt-4">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">500+</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Solutions Created</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Key Features Section */}
          <div className="mt-24 sm:mt-32">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                What Makes Our Solutions Unique
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Every solution comes with comprehensive insights to maximize your success
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Market Capacity */}
              <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-200/50 dark:border-orange-800/50">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  Market Capacity
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Detailed market size and growth potential analysis with TAM, SAM, and SOM calculations
                </p>
              </div>

              {/* Target People */}
              <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-200/50 dark:border-teal-800/50">
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                  Target People
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Clear identification of your ideal customers with demographics, psychographics, and behavior patterns
                </p>
              </div>

              {/* Problem Context */}
              <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200/50 dark:border-blue-800/50">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Problem Context
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Deep understanding of the root problem with pain points, current solutions, and market gaps
                </p>
              </div>

              {/* Actionable Steps */}
              <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-200/50 dark:border-yellow-800/50">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                  Actionable Steps
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Clear roadmap for implementation with milestones, resources needed, and success metrics
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-3xl p-8 sm:p-12 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
              <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Discover Your Next Big Opportunity?
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who have found their breakthrough ideas through our platform
              </p>
            <Link
                href="/explore"
                className="inline-flex items-center justify-center"
              >
                <ShimmerButton className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl">
                  <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                    Start Exploring Ideas
                  </span>
                  <ArrowRight className="text-white ml-2 h-5 w-5" />
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </div>



      {/* Subscription Prompt */}
      <SubscriptionPrompt
        isOpen={showSubscriptionPrompt}
        onClose={() => setShowSubscriptionPrompt(false)}
        viewsUsed={6 - (userData?.viewsRemaining || 6)}
        totalFreeViews={6}
      />

      <Footer />

      {/* Navigation Dots */}
      <NavigationDots
        sections={[
          { id: 'hero', label: 'Home', icon: <Target className="h-2 w-2" /> },
          { id: 'about', label: 'About', icon: <Heart className="h-2 w-2" /> },
          { id: 'how-it-works', label: 'How It Works', icon: <Brain className="h-2 w-2" /> },
        ]}
        position="right"
        size="md"
      />
    </div>
  );
}
