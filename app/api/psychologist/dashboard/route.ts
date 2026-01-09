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

        const today = new Date().toISOString().split('T')[0];

        // Get all bookings for this psychologist
        const allBookings = await prisma.booking.findMany({
            where: {
                doctorId: user.doctorId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Calculate statistics
        const todayAppointments = allBookings.filter(
            (b) => b.date === today && b.status !== 'cancelled'
        ).length;

        const uniquePatients = new Set(allBookings.map((b) => b.email)).size;

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const completedThisMonth = allBookings.filter((b) => {
            const bookingDate = new Date(b.date);
            return (
                b.status === 'completed' &&
                bookingDate.getMonth() === currentMonth &&
                bookingDate.getFullYear() === currentYear
            );
        });

        // Get doctor fee for earnings calculation
        const doctor = await prisma.doctor.findUnique({
            where: { id: user.doctorId },
        });

        const monthlyEarnings = completedThisMonth.length * (doctor?.fee || 0);

        const completedSessions = allBookings.filter(
            (b) => b.status === 'completed'
        ).length;

        // Get upcoming appointments
        const upcomingAppointments = allBookings
            .filter((b) => {
                const bookingDate = new Date(b.date);
                return bookingDate >= new Date() && b.status !== 'cancelled';
            })
            .slice(0, 5);

        return NextResponse.json({
            stats: {
                todayAppointments,
                totalPatients: uniquePatients,
                monthlyEarnings,
                completedSessions,
            },
            upcomingAppointments,
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
