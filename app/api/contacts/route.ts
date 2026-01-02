import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, email, phone, service, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^\S+@\S+$/i;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create contact in database
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                phone: phone || '',
                service: service || '',
                message,
                status: 'new',
            },
        });

        // TODO: Send notification email to admin
        // await sendContactNotificationEmail(contact);

        return NextResponse.json(
            {
                success: true,
                message: 'Contact form submitted successfully',
                contactId: contact.id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch contacts (for admin dashboard)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const where = status ? { status } : {};

        const contacts = await prisma.contact.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 100,
        });

        return NextResponse.json({ contacts });
    } catch (error) {
        console.error('Fetch contacts error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}
