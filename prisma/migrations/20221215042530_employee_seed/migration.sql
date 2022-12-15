/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "companyTitleId" SET DEFAULT 'Default',
ALTER COLUMN "teamId" SET DEFAULT 'Default';

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
