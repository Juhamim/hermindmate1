import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const doctors = await prisma.doctor.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ doctors });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return NextResponse.json({ doctors: [] });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, role, bio, fee, photo, status } = body;

        const doctor = await prisma.doctor.create({
            data: {
                name,
                role,
                bio,
                fee: parseInt(fee),
                photo: photo || 'https://via.placeholder.com/300',
                status: status || 'Active',
            },
        });

        return NextResponse.json({ success: true, doctor }, { status: 201 });
    } catch (error) {
        console.error('Error creating doctor:', error);
        return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, role, bio, fee, photo, status } = body;

        const doctor = await prisma.doctor.update({
            where: { id },
            data: {
                name,
                role,
                bio,
                fee: parseInt(fee),
                photo,
                status,
            },
        });

        return NextResponse.json({ success: true, doctor });
    } catch (error) {
        console.error('Error updating doctor:', error);
        return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await prisma.doctor.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
    }
}
