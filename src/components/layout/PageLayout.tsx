'use client';

import { ReactNode } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

interface PageLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  navigationProps?: {
    onSearch?: (query: string) => void;
    browniePoints?: number;
    viewsRemaining?: number;
    userData?: {
      isPremium: boolean;
      viewsRemaining: number;
    } | null;
    onShowSubscriptionPrompt?: () => void;
  };
}

export default function PageLayout({
  children,
  showNavigation = true,
  showFooter = true,
  navigationProps = {}
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavigation && <Navigation {...navigationProps} />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}