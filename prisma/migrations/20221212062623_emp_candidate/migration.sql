/*
  Warnings:

  - A unique constraint covering the columns `[tenantId,email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_companyTitleId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_teamId_fkey";

-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "companyTitleId" DROP NOT NULL,
ALTER COLUMN "teamId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_tenantId_email_key" ON "Employee"("tenantId", "email");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyTitleId_fkey" FOREIGN KEY ("companyTitleId") REFERENCES "CompanyTitle"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("name") ON DELETE SET NULL ON UPDATE CASCADE;
