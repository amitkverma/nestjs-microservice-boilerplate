/*
  Warnings:

  - You are about to drop the column `teamName` on the `Audience` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamId,eventId]` on the table `Audience` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `Audience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_companyTitleId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_teamId_fkey";

-- DropIndex
DROP INDEX "Audience_teamName_eventId_key";

-- AlterTable
ALTER TABLE "Audience" DROP COLUMN "teamName",
ADD COLUMN     "teamId" VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "companyTitleId" DROP NOT NULL,
ALTER COLUMN "teamId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Audience_teamId_eventId_key" ON "Audience"("teamId", "eventId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyTitleId_fkey" FOREIGN KEY ("companyTitleId") REFERENCES "CompanyTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audience" ADD CONSTRAINT "Audience_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
