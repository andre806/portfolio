import { NextRequest, NextResponse } from 'next/server';

const locales = ['pt', 'en'];
const defaultLocale = 'pt';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for static files, API routes, and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname === '/favicon.ico' ||
        pathname === '/favicon.svg' ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/public')
    ) {
        return NextResponse.next();
    }

    // Check if the pathname already starts with a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // If pathname doesn't have a locale, redirect to default locale
    if (!pathnameHasLocale) {
        const locale = defaultLocale;
        const redirectPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
        return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|favicon.ico|.*\\.).*)'
    ]
};
