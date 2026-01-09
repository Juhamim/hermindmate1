import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('session-token')?.value;

        if (token) {
            await deleteSession(token);
        }

        const response = NextResponse.json({ success: true });
        response.cookies.delete('session-token');

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
