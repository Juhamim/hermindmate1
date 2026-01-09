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

        const doctor = await prisma.doctor.findUnique({
            where: { id: user.doctorId },
        });

        if (!doctor) {
            return NextResponse.json(
                { error: 'Doctor not found' },
                { status: 404 }
            );
        }

        const allBookings = await prisma.booking.findMany({
            where: {
                doctorId: user.doctorId,
                status: 'completed',
            },
        });

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // This month's earnings
        const thisMonthBookings = allBookings.filter((b) => {
            const bookingDate = new Date(b.date);
            return (
                bookingDate.getMonth() === currentMonth &&
                bookingDate.getFullYear() === currentYear
            );
        });

        // Last month's earnings
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const lastMonthBookings = allBookings.filter((b) => {
            const bookingDate = new Date(b.date);
            return (
                bookingDate.getMonth() === lastMonth &&
                bookingDate.getFullYear() === lastMonthYear
            );
        });

        // This year's earnings
        const thisYearBookings = allBookings.filter((b) => {
            const bookingDate = new Date(b.date);
            return bookingDate.getFullYear() === currentYear;
        });

        // Monthly breakdown for chart
        const monthlyBreakdown = [];
        for (let month = 0; month < 12; month++) {
            const monthBookings = allBookings.filter((b) => {
                const bookingDate = new Date(b.date);
                return (
                    bookingDate.getMonth() === month &&
                    bookingDate.getFullYear() === currentYear
                );
            });
            monthlyBreakdown.push({
                month,
                earnings: monthBookings.length * doctor.fee,
                sessions: monthBookings.length,
            });
        }

        return NextResponse.json({
            earnings: {
                thisMonth: thisMonthBookings.length * doctor.fee,
                lastMonth: lastMonthBookings.length * doctor.fee,
                thisYear: thisYearBookings.length * doctor.fee,
                completedSessions: allBookings.length,
                monthlyBreakdown,
            },
        });
    } catch (error) {
        console.error('Get earnings error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
