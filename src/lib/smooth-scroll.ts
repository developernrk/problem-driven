/**
 * Smooth Scrolling Utility
 * A comprehensive utility for handling smooth scrolling throughout the application
 */

export interface ScrollOptions {
  /** Offset from the top of the target element (useful for fixed headers) */
  offset?: number;
  /** Custom scroll behavior */
  behavior?: ScrollBehavior;
  /** Duration of the scroll animation in milliseconds (for custom implementation) */
  duration?: number;
  /** Easing function for custom scroll animation */
  easing?: (t: number) => number;
}

export interface ScrollToElementOptions extends ScrollOptions {
  /** The target element ID (without #) */
  elementId: string;
}

export interface ScrollToPositionOptions extends ScrollOptions {
  /** Target Y position */
  top: number;
  /** Target X position (optional) */
  left?: number;
}

/**
 * Default easing functions
 */
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
};

/**
 * Default scroll options
 */
const defaultOptions: Required<ScrollOptions> = {
  offset: 0,
  behavior: 'smooth',
  duration: 800,
  easing: easingFunctions.easeInOutCubic,
};

/**
 * Check if smooth scrolling is supported and preferred by the user
 */
export const isSmoothScrollSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;
  
  // Check if smooth scrolling is supported
  return 'scrollBehavior' in document.documentElement.style;
};

/**
 * Custom smooth scroll implementation for better control
 */
const customSmoothScroll = (
  targetPosition: number,
  options: Required<ScrollOptions>
): Promise<void> => {
  return new Promise((resolve) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / options.duration, 1);
      const easedProgress = options.easing(progress);
      
      const currentPosition = startPosition + distance * easedProgress;
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animateScroll);
  });
};

/**
 * Scroll to a specific element by ID
 */
export const scrollToElement = async (
  elementId: string,
  options: Partial<ScrollOptions> = {}
): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`);
    
return false;
  }

  const mergedOptions = { ...defaultOptions, ...options };
  const elementRect = element.getBoundingClientRect();
  const targetPosition = window.pageYOffset + elementRect.top - mergedOptions.offset;

  try {
    if (isSmoothScrollSupported() && mergedOptions.behavior === 'smooth') {
      // Use native smooth scrolling
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    } else {
      // Use custom smooth scrolling for better control or fallback
      await customSmoothScroll(targetPosition, mergedOptions);
    }
    
return true;
  } catch (error) {
    console.error('Error during smooth scroll:', error);
    // Fallback to instant scroll
    window.scrollTo(0, targetPosition);
    
return false;
  }
};

/**
 * Scroll to a specific position
 */
export const scrollToPosition = async (
  options: ScrollToPositionOptions
): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  const mergedOptions = { ...defaultOptions, ...options };
  const targetPosition = options.top - mergedOptions.offset;

  try {
    if (isSmoothScrollSupported() && mergedOptions.behavior === 'smooth') {
      window.scrollTo({
        top: targetPosition,
        left: options.left || 0,
        behavior: 'smooth',
      });
    } else {
      await customSmoothScroll(targetPosition, mergedOptions);
    }
    
return true;
  } catch (error) {
    console.error('Error during smooth scroll:', error);
    window.scrollTo(options.left || 0, targetPosition);
    
return false;
  }
};

/**
 * Scroll to top of the page
 */
export const scrollToTop = async (options: Partial<ScrollOptions> = {}): Promise<boolean> => {
  return scrollToPosition({ top: 0, ...options });
};

/**
 * Scroll to bottom of the page
 */
export const scrollToBottom = async (options: Partial<ScrollOptions> = {}): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  
  return scrollToPosition({ top: documentHeight, ...options });
};

/**
 * Scroll to hash (URL fragment)
 */
export const scrollToHash = async (
  hash: string,
  options: Partial<ScrollOptions> = {}
): Promise<boolean> => {
  if (!hash) return false;
  
  // Remove the # if it exists
  const elementId = hash.startsWith('#') ? hash.slice(1) : hash;
  
return scrollToElement(elementId, options);
};

/**
 * Handle hash changes in the URL
 */
export const handleHashChange = (options: Partial<ScrollOptions> = {}) => {
  const hash = window.location.hash;
  if (hash) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      scrollToHash(hash, options);
    }, 100);
  }
};

/**
 * Initialize hash scrolling for the entire application
 */
export const initializeHashScrolling = (options: Partial<ScrollOptions> = {}) => {
  if (typeof window === 'undefined') return;

  // Handle initial hash on page load
  handleHashChange(options);

  // Listen for hash changes
  const hashChangeHandler = () => handleHashChange(options);
  window.addEventListener('hashchange', hashChangeHandler);

  // Return cleanup function
  return () => {
    window.removeEventListener('hashchange', hashChangeHandler);
  };
};

/**
 * Scroll into view with better control
 */
export const scrollIntoView = async (
  element: HTMLElement,
  options: Partial<ScrollOptions> = {}
): Promise<boolean> => {
  if (!element) return false;

  const mergedOptions = { ...defaultOptions, ...options };
  const elementRect = element.getBoundingClientRect();
  const targetPosition = window.pageYOffset + elementRect.top - mergedOptions.offset;

  try {
    if (isSmoothScrollSupported() && mergedOptions.behavior === 'smooth') {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      await customSmoothScroll(targetPosition, mergedOptions);
    }
    
return true;
  } catch (error) {
    console.error('Error during scroll into view:', error);
    element.scrollIntoView();
    
return false;
  }
};

/**
 * Check if an element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  
return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get scroll progress (0-1) of the page
 */
export const getScrollProgress = (): number => {
  if (typeof window === 'undefined') return 0;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  return scrollHeight > 0 ? scrollTop / scrollHeight : 0;
};

/**
 * Debounce function for scroll events
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};