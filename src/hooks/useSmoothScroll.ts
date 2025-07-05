import { useCallback, useEffect, useRef } from 'react';
import {
  scrollToElement,
  scrollToPosition,
  scrollToTop,
  scrollToBottom,
  scrollToHash,
  scrollIntoView,
  initializeHashScrolling,
  isElementInViewport,
  getScrollProgress,
  debounce,
  throttle,
  type ScrollOptions,
  type ScrollToPositionOptions,
} from '@/lib/smooth-scroll';

export interface UseSmoothScrollOptions extends Partial<ScrollOptions> {
  /** Whether to automatically handle hash changes */
  autoHandleHash?: boolean;
}

export interface UseSmoothScrollReturn {
  /** Scroll to an element by ID */
  scrollToElement: (elementId: string, options?: Partial<ScrollOptions>) => Promise<boolean>;
  /** Scroll to a specific position */
  scrollToPosition: (options: ScrollToPositionOptions) => Promise<boolean>;
  /** Scroll to top of the page */
  scrollToTop: (options?: Partial<ScrollOptions>) => Promise<boolean>;
  /** Scroll to bottom of the page */
  scrollToBottom: (options?: Partial<ScrollOptions>) => Promise<boolean>;
  /** Scroll to hash (URL fragment) */
  scrollToHash: (hash: string, options?: Partial<ScrollOptions>) => Promise<boolean>;
  /** Scroll element into view */
  scrollIntoView: (element: HTMLElement, options?: Partial<ScrollOptions>) => Promise<boolean>;
  /** Check if element is in viewport */
  isElementInViewport: (element: HTMLElement) => boolean;
  /** Get current scroll progress (0-1) */
  getScrollProgress: () => number;
  /** Debounce utility */
  debounce: typeof debounce;
  /** Throttle utility */
  throttle: typeof throttle;
}

/**
 * Custom hook for smooth scrolling functionality
 */
export const useSmoothScroll = (options: UseSmoothScrollOptions = {}): UseSmoothScrollReturn => {
  const defaultOptionsRef = useRef<Partial<ScrollOptions>>(options);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Update default options when they change
  useEffect(() => {
    defaultOptionsRef.current = options;
  }, [options]);

  // Initialize hash scrolling if enabled
  useEffect(() => {
    if (options.autoHandleHash !== false) {
      cleanupRef.current = initializeHashScrolling(defaultOptionsRef.current);
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [options.autoHandleHash]);

  const scrollToElementCallback = useCallback(
    async (elementId: string, customOptions?: Partial<ScrollOptions>) => {
      const mergedOptions = { ...defaultOptionsRef.current, ...customOptions };
      
return scrollToElement(elementId, mergedOptions);
    },
    []
  );

  const scrollToPositionCallback = useCallback(
    async (positionOptions: ScrollToPositionOptions) => {
      const mergedOptions = { ...defaultOptionsRef.current, ...positionOptions };
      
return scrollToPosition(mergedOptions);
    },
    []
  );

  const scrollToTopCallback = useCallback(
    async (customOptions?: Partial<ScrollOptions>) => {
      const mergedOptions = { ...defaultOptionsRef.current, ...customOptions };
      
return scrollToTop(mergedOptions);
    },
    []
  );

  const scrollToBottomCallback = useCallback(
    async (customOptions?: Partial<ScrollOptions>) => {
      const mergedOptions = { ...defaultOptionsRef.current, ...customOptions };
      
return scrollToBottom(mergedOptions);
    },
    []
  );

  const scrollToHashCallback = useCallback(
    async (hash: string, customOptions?: Partial<ScrollOptions>) => {
      const mergedOptions = { ...defaultOptionsRef.current, ...customOptions };
      
return scrollToHash(hash, mergedOptions);
    },
    []
  );

  const scrollIntoViewCallback = useCallback(
    async (element: HTMLElement, customOptions?: Partial<ScrollOptions>) => {
      const mergedOptions = { ...defaultOptionsRef.current, ...customOptions };
      
return scrollIntoView(element, mergedOptions);
    },
    []
  );

  return {
    scrollToElement: scrollToElementCallback,
    scrollToPosition: scrollToPositionCallback,
    scrollToTop: scrollToTopCallback,
    scrollToBottom: scrollToBottomCallback,
    scrollToHash: scrollToHashCallback,
    scrollIntoView: scrollIntoViewCallback,
    isElementInViewport,
    getScrollProgress,
    debounce,
    throttle,
  };
};

export default useSmoothScroll;