/*
  Warnings:

  - A unique constraint covering the columns `[name,tenantId]` on the table `CompanyTitle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,tenantId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenantId` to the `CompanyTitle` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyTitleId` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamId` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tenantId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_companyTitleId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_teamId_fkey";

-- DropIndex
DROP INDEX "CompanyTitle_name_key";

-- DropIndex
DROP INDEX "Team_name_key";

-- AlterTable
ALTER TABLE "CompanyTitle" ADD COLUMN     "tenantId" VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "companyTitleId" SET NOT NULL,
ALTER COLUMN "companyTitleId" DROP DEFAULT,
ALTER COLUMN "teamId" SET NOT NULL,
ALTER COLUMN "teamId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "tenantId" VARCHAR(60) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompanyTitle_name_tenantId_key" ON "CompanyTitle"("name", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_tenantId_key" ON "Team"("name", "tenantId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyTitleId_fkey" FOREIGN KEY ("companyTitleId") REFERENCES "CompanyTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTitle" ADD CONSTRAINT "CompanyTitle_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
