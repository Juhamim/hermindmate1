import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'psychologist' || !user.doctorId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const appointments = await prisma.booking.findMany({
            where: {
                doctorId: user.doctorId,
            },
            orderBy: {
                date: 'desc',
            },
        });

        return NextResponse.json({ appointments });
    } catch (error) {
        console.error('Get appointments error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
