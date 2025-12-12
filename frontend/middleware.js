import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const jwtCookie = request.cookies.get('jwt_token'); // Changed to jwt_token
  const pathname = request.nextUrl.pathname;

  console.log("★★★★★★ Middleware is running! Path:", pathname, "JWT Cookie:", jwtCookie ? 'present' : 'absent');

  const isAuthenticated = !!jwtCookie; // Check if JWT cookie exists

  // Define public paths that don't require authentication
  const publicPaths = ['/', '/support', '/forgot-password', '/privacy', '/terms']; 
  const authPaths = ['/auth/login', '/auth/register']; 

  // Redirect authenticated users from auth pages to a generic dashboard
  if (isAuthenticated && authPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/dashboard', request.url)); // Generic dashboard redirect
  }

  // Protect dashboard routes - redirect unauthenticated users to login
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Allow access to public paths without authentication
  if (publicPaths.some(path => pathname === path)) {
    return NextResponse.next();
  }

  // Allow authenticated users to proceed to any other path (including dashboard)
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // If none of the above, it means it's a non-public, non-auth path and user is not authenticated.
  // Redirect to login.
  if (!isAuthenticated && !publicPaths.some(path => pathname === path) && !authPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};