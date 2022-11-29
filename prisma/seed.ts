import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.info(`[+] Seeding Db For Roles`);
    await Promise.all([
        prisma.role.createMany({
            data: [
                {
                    name: 'HR',
                    description: 'Human Resource Role'
                },
                {
                    name: 'Admin',
                    description: 'System Admin Role'
                },
                {
                    name: 'SuperAdmin',
                    description: 'Super Admin Role'
                },
            ]
        })
    ]);
    console.info(`[+] Seeded Db`);

}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})