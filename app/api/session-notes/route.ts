import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'psychologist' || !user.doctorId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { bookingId, notes } = await request.json();

        if (!bookingId || !notes) {
            return NextResponse.json(
                { error: 'Booking ID and notes are required' },
                { status: 400 }
            );
        }

        // Verify the booking belongs to this psychologist
        const booking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                doctorId: user.doctorId,
            },
        });

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        const sessionNote = await prisma.sessionNote.create({
            data: {
                bookingId,
                doctorId: user.doctorId,
                notes,
            },
        });

        return NextResponse.json({ sessionNote }, { status: 201 });
    } catch (error) {
        console.error('Create session note error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'psychologist' || !user.doctorId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const bookingId = searchParams.get('bookingId');

        const where: any = { doctorId: user.doctorId };
        if (bookingId) {
            where.bookingId = bookingId;
        }

        const sessionNotes = await prisma.sessionNote.findMany({
            where,
            include: {
                booking: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ sessionNotes });
    } catch (error) {
        console.error('Get session notes error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
