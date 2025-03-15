import { PrismaClient } from '@prisma/client';

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
}

taskStatusSeed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
