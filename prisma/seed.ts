import { hash } from 'bcrypt';
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
            ]
        })
    ]);
    const superAdminRole = await prisma.role.create({
        data: {
            name: 'SuperAdmin',
            description: 'Super Admin Role'
        }
    });

    const defaultTenant = await prisma.tenant.create({
        data: {
            name: 'Consultbae',
            auth: {
                create: {
                    accessTokenExpiration: '2d',
                    name: 'Consultbae Auth',
                    refreshTokenExpiration: '7d',
                    secrate: 'Consultbae&&&^^^'
                }
            }
        }
    });

    const superUser = await prisma.user.create({
        data: {
            email: 'super@consultbae.com',
            firstName: 'Super',
            lastName: 'Admin',
            tenantId: defaultTenant.id,
            roleId: superAdminRole.id,
            status: 'Active',
            isDeleted: false,
            password: await hash(`consultbae#123!`, 10)
        }
    });

    await EventsSeed();
    await EmployeeDefaultTeamsSeed(defaultTenant.id);

    console.info(`[+] Seeded Db`);
}


async function EmployeeDefaultTeamsSeed(tenantId: string){
    return false
}

async function EventsSeed() {
    const onlneEventType = await prisma.eventType.create({
        data: {
            name: 'Online Event'
        }
    })
    const offlineEventType = await prisma.eventType.create({
        data: {
            name: 'Offline Event'
        }
    })
    await Promise.all([
        prisma.eventStatus.createMany({
            data: [
                {
                    name: 'Pending'
                },
                {
                    name: 'Active'
                },
                {
                    name: 'Onhold'
                },
                {
                    name: 'Completed'
                }
            ]
        }),
        prisma.eventCategory.createMany({
            data: [{
                eventTypeId: onlneEventType.id,
                name: 'Yoga'
            },
            {
                eventTypeId: offlineEventType.id,
                name: 'Game'
            }]
        }),
        
    ])
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})