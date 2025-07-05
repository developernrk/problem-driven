import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/api/public(.*)',
  '/api/seed(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect API routes that require authentication
  if (req.nextUrl.pathname.startsWith('/api/user')) {
    await auth.protect();
  }
  
  // Protect test endpoints that require authentication
  if (req.nextUrl.pathname.startsWith('/api/test')) {
    await auth.protect();
  }
  
  // Protect ideas endpoints that require authentication
  if (req.nextUrl.pathname.startsWith('/api/ideas/like') || 
      req.nextUrl.pathname.startsWith('/api/ideas/unlike')) {
    await auth.protect();
  }
  
  // Protect dashboard and other authenticated pages
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};