import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get('session-token')?.value;
    const { pathname } = request.nextUrl;

    // Public routes that don't require auth - including public APIs for booking
    const publicRoutes = [
        '/login',
        '/api/auth/login',
        '/',
        '/api/doctors',
        '/api/bookings',
        '/api/services',
        '/api/contact',
        '/api/articles',
    ];
    const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api/auth');

    // If no session token and trying to access protected route
    if (!sessionToken && !isPublicRoute) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // If has session token and trying to access login page, redirect based on role
    if (sessionToken && pathname === '/login') {
        try {
            const response = await fetch(new URL('/api/auth/session', request.url), {
                headers: {
                    Cookie: `session-token=${sessionToken}`,
                },
            });

            if (response.ok) {
                const { user } = await response.json();
                if (user) {
                    const url = request.nextUrl.clone();
                    url.pathname = user.role === 'admin' ? '/admin' : '/psychologist';
                    return NextResponse.redirect(url);
                }
            }
        } catch (error) {
            console.error('Middleware session check error:', error);
        }
    }

    // Role-based route protection
    if (sessionToken && (pathname.startsWith('/admin') || pathname.startsWith('/psychologist'))) {
        try {
            const response = await fetch(new URL('/api/auth/session', request.url), {
                headers: {
                    Cookie: `session-token=${sessionToken}`,
                },
            });

            if (response.ok) {
                const { user } = await response.json();

                if (!user) {
                    const url = request.nextUrl.clone();
                    url.pathname = '/login';
                    return NextResponse.redirect(url);
                }

                // Check role-based access
                if (pathname.startsWith('/admin') && user.role !== 'admin') {
                    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
                }

                if (pathname.startsWith('/psychologist') && user.role !== 'psychologist') {
                    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
                }
            } else {
                const url = request.nextUrl.clone();
                url.pathname = '/login';
                return NextResponse.redirect(url);
            }
        } catch (error) {
            console.error('Middleware auth check error:', error);
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|public).*)'],
};
