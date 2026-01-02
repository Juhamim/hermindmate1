import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Format for frontend
        const formattedArticles = articles.map(article => ({
            id: article.id,
            title: article.title,
            category: article.category,
            author: article.author,
            status: article.status,
            views: article.views,
            image: article.image,
            content: article.content,
            date: new Date(article.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
        }));

        return NextResponse.json({ articles: formattedArticles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ articles: [] });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, category, author, content, status, image } = body;

        const article = await prisma.article.create({
            data: {
                title,
                category,
                author: author || 'Admin',
                content,
                status: status || 'Draft',
                image: image || 'https://source.unsplash.com/random/800x600/?wellness',
                views: 0,
            },
        });

        return NextResponse.json({ success: true, article }, { status: 201 });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await prisma.article.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }
}
