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
                { error: 'Profile not found' },
                { status: 404 }
            );
        }

        const profile = {
            name: doctor.name,
            email: user.email,
            role: doctor.role,
            bio: doctor.bio,
            fee: doctor.fee,
            photo: doctor.photo,
            status: doctor.status,
        };

        return NextResponse.json({ profile });
    } catch (error) {
        console.error('Get profile error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'psychologist' || !user.doctorId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name, role, bio, fee, photo } = await request.json();

        const updatedDoctor = await prisma.doctor.update({
            where: { id: user.doctorId },
            data: {
                name,
                role,
                bio,
                fee: Number(fee),
                ...(photo && { photo }),
            },
        });

        // Also update user name
        await prisma.user.update({
            where: { id: user.id },
            data: { name },
        });

        return NextResponse.json({ doctor: updatedDoctor });
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
