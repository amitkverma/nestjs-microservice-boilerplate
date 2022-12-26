-- CreateEnum
CREATE TYPE "EventMediaStatus" AS ENUM ('Review', 'Shortlist', 'Publish', 'Reject');

-- CreateTable
CREATE TABLE "EventEmployeeMediaListItem" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "mimeType" VARCHAR(255),
    "key" VARCHAR(255),
    "url" VARCHAR(255),
    "eventEmployeeMediaId" VARCHAR(60) NOT NULL,

    CONSTRAINT "EventEmployeeMediaListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventEmployeesMedia" (
    "id" TEXT NOT NULL,
    "eventId" VARCHAR(60) NOT NULL,
    "employeeId" VARCHAR(60) NOT NULL,
    "status" "EventMediaStatus" NOT NULL DEFAULT 'Review',
    "createdBy" VARCHAR(60),
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(60),
    "modifiedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventEmployeesMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventEmployeeMediaListItem" ADD CONSTRAINT "EventEmployeeMediaListItem_eventEmployeeMediaId_fkey" FOREIGN KEY ("eventEmployeeMediaId") REFERENCES "EventEmployeesMedia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEmployeesMedia" ADD CONSTRAINT "EventEmployeesMedia_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEmployeesMedia" ADD CONSTRAINT "EventEmployeesMedia_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
