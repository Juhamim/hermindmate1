import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ services });
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ services: [] });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, icon, color } = body;

        const service = await prisma.service.create({
            data: {
                title,
                description,
                icon,
                color,
            },
        });

        return NextResponse.json({ success: true, service }, { status: 201 });
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, title, description, icon, color } = body;

        const service = await prisma.service.update({
            where: { id },
            data: {
                title,
                description,
                icon,
                color,
            },
        });

        return NextResponse.json({ success: true, service });
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await prisma.service.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
