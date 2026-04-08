import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = [
    '/', '/lieux', '/plan', '/api/lieux',
    '/auth/signin', '/auth/register',
    '/_next', '/favicon.ico', '/images'
  ];
  const isAdminPath = pathname.startsWith('/admin');
  const hasSession = request.cookies.has('next-auth.session-token');

  if (isAdminPath && !hasSession) {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (hasSession && (pathname === '/auth/signin' || pathname === '/auth/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};