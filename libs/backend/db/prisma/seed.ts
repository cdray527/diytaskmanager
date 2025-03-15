import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function taskStatusSeed() {
    const defaultTaskStatus = [
        { id: 1, name: 'To do' },
        { id: 2, name: 'Completed' }
    ];

    for (const status of defaultTaskStatus) {
        await prisma.taskStatus.upsert({
            where: { id: status.id },
            update: {},
            create: {
                id: status.id,
                name: status.name
            }
        });
    }

    console.log('TaskStatus Table seeded');
}

// Seed Hardcoded User
async function userSeed() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('SecurePassword123', saltRounds);

    await prisma.user.upsert({
        where: { email: 'cdray085@hotmail.com' },
        update: {},
        create: {
            email: 'cdray085@hotmail.com',
            name: 'Ray',
            password: hashedPassword
        }
    });

    console.log('User Table seeded');
}

async function main() {
    await taskStatusSeed();
    await userSeed();
}

main()
    .catch((e) => {
        console.error('Seeding Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
