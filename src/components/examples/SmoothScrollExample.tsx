'use client';

import React from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import {
  BackToTopButton,
  SmoothScrollLink,
  NavigationDots,
  ScrollProgressBar,
  ScrollSpy,
} from '@/components/ui/scroll-components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowDown, 
  ArrowUp, 
  Hash, 
  MousePointer, 
  Navigation, 
  Scroll,
  Target,
  Zap,
  Heart,
  Star
} from 'lucide-react';

/**
 * Example component demonstrating all smooth scrolling features
 */
export const SmoothScrollExample: React.FC = () => {
  const { 
    scrollToElement, 
    scrollToTop, 
    scrollToBottom, 
    scrollToHash,
    getScrollProgress 
  } = useSmoothScroll({
    offset: 80,
    duration: 1000,
    autoHandleHash: true,
  });

  const sections = [
    { id: 'section-1', title: 'Basic Scrolling', icon: <Scroll className="h-4 w-4" /> },
    { id: 'section-2', title: 'Advanced Features', icon: <Zap className="h-4 w-4" /> },
    { id: 'section-3', title: 'Navigation Components', icon: <Navigation className="h-4 w-4" /> },
    { id: 'section-4', title: 'Scroll Spy', icon: <Target className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar 
        height={4} 
        color="bg-gradient-to-r from-blue-500 to-purple-600" 
        showPercentage 
      />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Smooth Scroll Demo
            </h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToTop()}
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Top
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToBottom()}
              >
                <ArrowDown className="h-4 w-4 mr-2" />
                Bottom
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-20 text-center scroll-snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Smooth Scrolling
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Made Easy
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Experience buttery smooth navigation with our comprehensive scrolling utilities
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sections.map((section) => (
              <SmoothScrollLink
                key={section.id}
                targetId={section.id}
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-900 dark:text-white hover:scale-105"
              >
                {section.icon}
                <span className="ml-2">{section.title}</span>
              </SmoothScrollLink>
            ))}
          </div>

          <ScrollSpy sectionIds={sections.map(s => s.id)}>
            {(activeId) => (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {activeId ? (
                  <Badge variant="secondary">
                    Currently viewing: {sections.find(s => s.id === activeId)?.title}
                  </Badge>
                ) : (
                  <Badge variant="outline">Scroll to see active section</Badge>
                )}
              </div>
            )}
          </ScrollSpy>
        </div>
      </section>

      {/* Section 1: Basic Scrolling */}
      <section id="section-1" className="py-20 bg-white dark:bg-gray-800 scroll-snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Scroll className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Basic Scrolling
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Simple and effective smooth scrolling to any element
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MousePointer className="h-5 w-5 mr-2" />
                  Programmatic Scrolling
                </CardTitle>
                <CardDescription>
                  Use JavaScript to scroll to specific elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => scrollToElement('section-2')}
                  className="w-full"
                >
                  Scroll to Section 2
                </Button>
                <Button
                  onClick={() => scrollToElement('section-3', { duration: 2000 })}
                  variant="outline"
                  className="w-full"
                >
                  Slow Scroll to Section 3
                </Button>
                <Button
                  onClick={() => scrollToElement('section-4', { offset: 120 })}
                  variant="secondary"
                  className="w-full"
                >
                  Scroll with Custom Offset
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hash className="h-5 w-5 mr-2" />
                  Hash Navigation
                </CardTitle>
                <CardDescription>
                  Navigate using URL fragments (hash links)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => scrollToHash('#section-2')}
                  className="w-full"
                >
                  Navigate to #section-2
                </Button>
                <Button
                  onClick={() => scrollToHash('section-3')}
                  variant="outline"
                  className="w-full"
                >
                  Navigate to section-3
                </Button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Try changing the URL hash manually!
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2: Advanced Features */}
      <section id="section-2" className="py-20 bg-gray-50 dark:bg-gray-900 scroll-snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Powerful features for enhanced user experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Easing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Different easing functions for various scroll feels
                </p>
                <Button
                  size="sm"
                  onClick={() => scrollToElement('section-3', { 
                    duration: 1500,
                    // Custom easing would be applied here
                  })}
                >
                  Try Custom Easing
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Respects user's motion preferences automatically
                </p>
                <Badge variant="outline">prefers-reduced-motion</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Optimized with throttling and debouncing
                </p>
                <Badge variant="secondary">60fps smooth</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: Navigation Components */}
      <section id="section-3" className="py-20 bg-white dark:bg-gray-800 scroll-snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Navigation className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Navigation Components
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Ready-to-use components for smooth navigation
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Available Components</CardTitle>
                <CardDescription>
                  Pre-built components you can use in your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">BackToTopButton</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Floating button that appears after scrolling
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">ScrollProgressBar</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Shows reading progress at the top
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">NavigationDots</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Side navigation with active indicators
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">SmoothScrollLink</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Links that scroll smoothly to targets
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: Scroll Spy */}
      <section id="section-4" className="py-20 bg-gray-50 dark:bg-gray-900 scroll-snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Target className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Scroll Spy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Track which section is currently in view
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Scroll Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Page Progress</span>
                    <span>{Math.round(getScrollProgress() * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-150"
                      style={{ width: `${getScrollProgress() * 100}%` }}
                    />
                  </div>
                </div>
                
                <ScrollSpy sectionIds={['hero', ...sections.map(s => s.id)]}>
                  {(activeId) => (
                    <div className="text-center">
                      <Badge variant={activeId ? "default" : "outline"} className="text-lg px-4 py-2">
                        {activeId ? `Active: ${activeId}` : 'No active section'}
                      </Badge>
                    </div>
                  )}
                </ScrollSpy>
              </div>
            </CardContent>
          </Card>

          {/* Large content to demonstrate scrolling */}
          <div className="mt-12 space-y-8">
            {Array.from({ length: 10 }, (_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Content Block {i + 1}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    This is additional content to demonstrate the scroll spy functionality. 
                    As you scroll through this section, you can see how the active section 
                    tracking works in real-time.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Dots */}
      <NavigationDots
        sections={[
          { id: 'hero', label: 'Hero', icon: <Star className="h-2 w-2" /> },
          ...sections.map(section => ({
            ...section,
            icon: React.cloneElement(section.icon, { className: 'h-2 w-2' })
          }))
        ]}
        position="right"
        size="md"
      />

      {/* Back to Top Button */}
      <BackToTopButton
        showAfter={200}
        size="lg"
        variant="default"
        position="bottom-right"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      />
    </div>
  );
};

export default SmoothScrollExample;