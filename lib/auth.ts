import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export type UserRole = 'admin' | 'psychologist';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    doctorId?: string | null;
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

// Session management
export async function createSession(userId: string): Promise<string> {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.session.create({
        data: {
            userId,
            token,
            expiresAt,
        },
    });

    return token;
}

export async function getSessionUser(token: string): Promise<AuthUser | null> {
    const session = await prisma.session.findUnique({
        where: { token },
        include: {
            user: true,
        },
    });

    if (!session || session.expiresAt < new Date()) {
        if (session) {
            await prisma.session.delete({ where: { id: session.id } });
        }
        return null;
    }

    return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as UserRole,
        doctorId: session.user.doctorId,
    };
}

export async function deleteSession(token: string): Promise<void> {
    await prisma.session.deleteMany({
        where: { token },
    });
}

// Helper to get current user from cookies
export async function getCurrentUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('session-token')?.value;

    if (!token) {
        return null;
    }

    return getSessionUser(token);
}

// Authorization helpers
export async function requireAuth(): Promise<AuthUser> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
}

export async function requireRole(role: UserRole): Promise<AuthUser> {
    const user = await requireAuth();
    if (user.role !== role) {
        throw new Error('Forbidden');
    }
    return user;
}

// Token generation
function generateToken(): string {
    return Array.from({ length: 32 }, () =>
        Math.random().toString(36).charAt(2)
    ).join('');
}
