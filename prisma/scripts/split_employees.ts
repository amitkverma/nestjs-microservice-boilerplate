import { PrismaClient, Employee } from '@prisma/client';
const prisma = new PrismaClient();
import { MailModoTeams} from './mailmodo/teams';

async function main() {
  const tenants = await prisma.tenant.findMany({
    where: {
      status: 'Active',
    },
  });

  console.log(`Batch Syning Working....`);

  for (const tenant of tenants) {
    let teanantTeams = new Map<string, Employee[]>();

    const tenantEmployees = await prisma.employee.findMany({
      where: {
        tenantId: tenant.id,
      },
    });

    // categorizing employees based on teams
    for (const employee of tenantEmployees) {
      if (!employee.teamId) {
        continue;
      }
      if (employee.teamId && !teanantTeams.get(employee.teamId)) {
        teanantTeams.set(employee.teamId, [employee]);
        continue;
      }
      teanantTeams.get(employee.teamId)?.push(employee);
    }
    console.log(`categorizing done.`, teanantTeams.keys());


    for(const teamName of teanantTeams.keys()){
      console.log(`Working for Team: `, teamName);
      const employees = teanantTeams.get(teamName);
      if(!employees){ continue; }
      const mailModoTeam = new MailModoTeams(teamName, employees, tenant.name);
      await mailModoTeam.syncContacts();
    }
    
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// Ref: https://support.mailmodo.com/support/solutions/articles/84000351297-adding-contacts-via-api
// template ID: dfe3aea8-52c2-4d58-9c58-3360f1dbf302

// templateID:   d8263f66-17be-4090-8a61-017d51d4fc9b (personal)
// api keys: 6688H8P-RVDMRC7-GZ32ZJQ-TKPPRQ5
