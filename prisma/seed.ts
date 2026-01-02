import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with initial data...');

    // Clear existing data
    await prisma.article.deleteMany();
    await prisma.service.deleteMany();
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
