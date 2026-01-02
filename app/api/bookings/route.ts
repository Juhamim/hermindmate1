import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { service, therapist, date, time, name, email, phone, notes } = body;

        // Validate required fields
        if (!service || !therapist || !date || !time || !name || !email || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create booking in database
        const booking = await prisma.booking.create({
            data: {
                service,
                therapist,
                date,
                time,
                name,
                email,
                phone,
                notes: notes || '',
                status: 'pending',
            },
        });

        // TODO: Send confirmation email here
        // await sendBookingConfirmationEmail(booking);

        return NextResponse.json(
            {
                success: true,
                booking: {
                    id: booking.id,
                    date: booking.date,
                    time: booking.time,
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch bookings (for admin/user dashboard)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (email) {
            // Get bookings for specific user
            const bookings = await prisma.booking.findMany({
                where: { email },
                orderBy: { createdAt: 'desc' },
            });
            return NextResponse.json({ bookings });
        }

        // Get all bookings (admin only - add auth later)
        const bookings = await prisma.booking.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50,
        });

        return NextResponse.json({ bookings });
    } catch (error) {
        console.error('Fetch bookings error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch bookings' },
            { status: 500 }
        );
    }
}
