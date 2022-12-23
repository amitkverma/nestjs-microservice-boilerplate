/*
  Warnings:

  - You are about to drop the column `mimeTpe` on the `Attachment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamName,eventId]` on the table `Audience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,eventId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mimeType` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "mimeTpe",
ADD COLUMN     "mimeType" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "image" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "EventTemplate" ALTER COLUMN "image" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "EventTemplateMedia" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "eventId" VARCHAR(60) NOT NULL,

    CONSTRAINT "EventTemplateMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Audience_teamName_eventId_key" ON "Audience"("teamName", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_eventId_key" ON "Participant"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "EventTemplateMedia" ADD CONSTRAINT "EventTemplateMedia_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
