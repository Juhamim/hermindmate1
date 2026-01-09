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

        const bookings = await prisma.booking.findMany({
            where: {
                doctorId: user.doctorId,
            },
            orderBy: {
                date: 'desc',
            },
        });

        // Group bookings by patient
        const patientsMap = new Map();

        bookings.forEach((booking) => {
            if (!patientsMap.has(booking.email)) {
                patientsMap.set(booking.email, {
                    name: booking.name,
                    email: booking.email,
                    phone: booking.phone,
                    totalSessions: 0,
                    lastSession: booking.date,
                });
            }

            const patient = patientsMap.get(booking.email);
            patient.totalSessions++;

            // Update last session if this booking is more recent
            if (new Date(booking.date) > new Date(patient.lastSession)) {
                patient.lastSession = booking.date;
            }
        });

        const patients = Array.from(patientsMap.values());

        return NextResponse.json({ patients });
    } catch (error) {
        console.error('Get patients error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
