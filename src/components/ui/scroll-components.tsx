'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export interface BackToTopButtonProps {
  /** Show button after scrolling this many pixels */
  showAfter?: number;
  /** Custom className */
  className?: string;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Button variant */
  variant?: 'default' | 'outline' | 'ghost';
  /** Custom icon */
  icon?: React.ReactNode;
  /** Position */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /** Offset from edges */
  offset?: number;
  /** Custom scroll options */
  scrollOptions?: Parameters<ReturnType<typeof useSmoothScroll>['scrollToTop']>[0];
}

/**
 * Back to Top Button Component
 */
export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  showAfter = 300,
  className,
  size = 'md',
  variant = 'default',
  icon,
  position = 'bottom-right',
  offset = 24,
  scrollOptions,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop, throttle } = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = throttle(() => {
      setIsVisible(window.pageYOffset > showAfter);
    }, 100);

    window.addEventListener('scroll', toggleVisibility);
    
return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter, throttle]);

  const handleClick = () => {
    scrollToTop(scrollOptions);
  };

  const sizeClasses = {
    sm: 'h-8 w-8 p-1.5',
    md: 'h-10 w-10 p-2',
    lg: 'h-12 w-12 p-3',
  };

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-lg',
    ghost: 'hover:bg-accent hover:text-accent-foreground shadow-lg',
  };

  const positionClasses = {
    'bottom-right': `bottom-${offset/4} right-${offset/4}`,
    'bottom-left': `bottom-${offset/4} left-${offset/4}`,
    'bottom-center': `bottom-${offset/4} left-1/2 transform -translate-x-1/2`,
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(
        'fixed z-50 rounded-full transition-all duration-300 hover:scale-110',
        sizeClasses[size],
        variantClasses[variant],
        positionClasses[position],
        className
      )}
      style={{
        bottom: `${offset}px`,
        right: position === 'bottom-right' ? `${offset}px` : undefined,
        left: position === 'bottom-left' ? `${offset}px` : undefined,
      }}
      aria-label="Back to top"
    >
      {icon || <ArrowUp className="h-4 w-4 ml-1" />}
    </button>
  );
};

export interface ScrollProgressBarProps {
  /** Custom className */
  className?: string;
  /** Progress bar height */
  height?: number;
  /** Progress bar color */
  color?: string;
  /** Position */
  position?: 'top' | 'bottom';
  /** Whether to show percentage text */
  showPercentage?: boolean;
}

/**
 * Scroll Progress Bar Component
 */
export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  className,
  height = 4,
  color = 'bg-primary',
  position = 'top',
  showPercentage = false,
}) => {
  const [progress, setProgress] = useState(0);
  const { getScrollProgress, throttle } = useSmoothScroll();

  useEffect(() => {
    const updateProgress = throttle(() => {
      setProgress(getScrollProgress() * 100);
    }, 16); // ~60fps

    window.addEventListener('scroll', updateProgress);
    
return () => window.removeEventListener('scroll', updateProgress);
  }, [getScrollProgress, throttle]);

  const positionClasses = {
    top: 'top-0',
    bottom: 'bottom-0',
  };

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-50 bg-gray-200 dark:bg-gray-800',
        positionClasses[position],
        className
      )}
      style={{ height: `${height}px` }}
    >
      <div
        className={cn('h-full transition-all duration-150 ease-out', color)}
        style={{ width: `${progress}%` }}
      />
      {showPercentage && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export interface SmoothScrollLinkProps {
  /** Target element ID (without #) */
  targetId: string;
  /** Link content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Custom scroll options */
  scrollOptions?: Parameters<ReturnType<typeof useSmoothScroll>['scrollToElement']>[1];
  /** Additional onClick handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Smooth Scroll Link Component
 */
export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  targetId,
  children,
  className,
  scrollOptions,
  onClick,
}) => {
  const { scrollToElement } = useSmoothScroll();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    scrollToElement(targetId, scrollOptions);
    onClick?.(event);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export interface ScrollSpyProps {
  /** Array of section IDs to spy on */
  sectionIds: string[];
  /** Offset for determining active section */
  offset?: number;
  /** Callback when active section changes */
  onActiveChange?: (activeId: string | null) => void;
  /** Children function that receives active section ID */
  children: (activeId: string | null) => React.ReactNode;
}

/**
 * Scroll Spy Component
 */
export const ScrollSpy: React.FC<ScrollSpyProps> = ({
  sectionIds,
  offset = 100,
  onActiveChange,
  children,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { throttle } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + offset;

      let currentActiveId: string | null = null;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentActiveId = id;
            break;
          }
        }
      }

      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
        onActiveChange?.(currentActiveId);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset, activeId, onActiveChange, throttle]);

  return <>{children(activeId)}</>;
};

export interface NavigationDotsProps {
  /** Array of section configurations */
  sections: Array<{
    id: string;
    label?: string;
    icon?: React.ReactNode;
  }>;
  /** Custom className */
  className?: string;
  /** Dot size */
  size?: 'sm' | 'md' | 'lg';
  /** Position */
  position?: 'right' | 'left';
  /** Offset from edge */
  offset?: number;
  /** Custom scroll options */
  scrollOptions?: Parameters<ReturnType<typeof useSmoothScroll>['scrollToElement']>[1];
}

/**
 * Navigation Dots Component for section navigation
 */
export const NavigationDots: React.FC<NavigationDotsProps> = ({
  sections,
  className,
  size = 'md',
  position = 'right',
  offset = 24,
  scrollOptions,
}) => {
  const { scrollToElement } = useSmoothScroll();

  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const positionClasses = {
    right: `right-${offset/4}`,
    left: `left-${offset/4}`,
  };

  return (
    <ScrollSpy sectionIds={sections.map(s => s.id)}>
      {(activeId) => (
        <div
          className={cn(
            'fixed top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3',
            positionClasses[position],
            className
          )}
          style={{
            [position]: `${offset}px`,
          }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToElement(section.id, scrollOptions)}
              className={cn(
                'rounded-full border-2 transition-all duration-200 hover:scale-125',
                sizeClasses[size],
                activeId === section.id
                  ? 'bg-primary border-primary'
                  : 'bg-transparent border-gray-400 hover:border-primary'
              )}
              title={section.label}
              aria-label={`Navigate to ${section.label || section.id}`}
            >
              {section.icon}
            </button>
          ))}
        </div>
      )}
    </ScrollSpy>
  );
};
