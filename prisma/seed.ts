import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with initial data...');

    // Clear existing data (in order due to foreign keys)
    await prisma.sessionNote.deleteMany();
    await prisma.session.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.article.deleteMany();
    await prisma.service.deleteMany();
    await prisma.user.deleteMany();
    await prisma.doctor.deleteMany();

    // Seed Doctors (Your Real Team)
    const doctors = await Promise.all([
        prisma.doctor.create({
            data: {
                name: 'Dr. Lakshmi Nair',
                role: 'Clinical Psychologist',
                bio: 'Specializing in postpartum depression and women\'s mental health with over 10 years of experience.',
                fee: 1500,
                photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300',
                status: 'Active',
            },
        }),
        prisma.doctor.create({
            data: {
                name: 'Dr. Priya Kumar',
                role: 'Psychiatrist',
                bio: 'Expert in adolescent mental health and anxiety disorders, helping teens navigate life challenges.',
                fee: 2000,
                photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300',
                status: 'Active',
            },
        }),
    ]);

    console.log(`✅ Created ${doctors.length} doctors`);

    // Seed Services
    const services = await Promise.all([
        prisma.service.create({
            data: {
                title: 'Clinical Psychology',
                description: 'Evidence-based therapy for depression, anxiety, and trauma',
                icon: 'Brain',
                color: '#FFB7B2',
            },
        }),
        prisma.service.create({
            data: {
                title: 'Adolescent Care',
                description: 'Specialized support for teens navigating identity and peer pressure',
                icon: 'Sparkles',
                color: '#C7CEEA',
            },
        }),
        prisma.service.create({
            data: {
                title: 'Pregnancy Support',
                description: 'Mental health care during pregnancy and postpartum',
                icon: 'Baby',
                color: '#E8D5F2',
            },
        }),
    ]);

    console.log(`✅ Created ${services.length} services`);

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@hermindmate.com',
            password: adminPassword,
            role: 'admin',
            name: 'Admin User',
        },
    });
    console.log(`✅ Created admin user: ${admin.email}`);

    // Create psychologist user linked to Dr. Priya Kumar
    const psychologistPassword = await bcrypt.hash('doctor123', 10);
    const psychologist = await prisma.user.create({
        data: {
            email: 'doctor@hermindmate.com',
            password: psychologistPassword,
            role: 'psychologist',
            name: 'Dr. Priya Kumar',
            doctorId: doctors[1].id, // Link to Dr. Priya Kumar
        },
    });
    console.log(`✅ Created psychologist user: ${psychologist.email}`);

    // Create sample bookings for the psychologist
    const bookings = await Promise.all([
        prisma.booking.create({
            data: {
                service: 'Individual Therapy',
                therapist: doctors[1].name,
                doctorId: doctors[1].id,
                date: '2026-01-15',
                time: '10:00 AM',
                name: 'Ananya Sharma',
                email: 'ananya@example.com',
                phone: '+91 98765 43210',
                notes: 'First session, anxiety issues',
                status: 'confirmed',
            },
        }),
        prisma.booking.create({
            data: {
                service: 'Couple Counseling',
                therapist: doctors[1].name,
                doctorId: doctors[1].id,
                date: '2026-01-16',
                time: '2:00 PM',
                name: 'Ravi and Meera Patel',
                email: 'ravi.patel@example.com',
                phone: '+91 98765 43211',
                notes: 'Marriage counseling',
                status: 'confirmed',
            },
        }),
        prisma.booking.create({
            data: {
                service: 'Individual Therapy',
                therapist: doctors[1].name,
                doctorId: doctors[1].id,
                date: '2026-01-10',
                time: '11:00 AM',
                name: 'Priya Reddy',
                email: 'priya.reddy@example.com',
                phone: '+91 98765 43212',
                notes: 'Follow-up session',
                status: 'completed',
            },
        }),
    ]);
    console.log(`✅ Created ${bookings.length} sample bookings`);

    console.log('✨ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
