import { MailModoCampaign } from './mailmodo/campaign';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.findFirst({
    where: { id: `a92cd989-2f27-4116-8880-88a0f8d9e59e` },
  });
  if (!tenant) throw new Error(`tenant invalid`);
  const mailModoCampain = new MailModoCampaign(
    tenant,
    `a203c873-bfef-4ce3-8312-2ee050e6899f`,
    `Customer Support`
  );

  await mailModoCampain.run();
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

// Demo Campaing Id: a203c873-bfef-4ce3-8312-2ee050e6899f
