-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('COURSE', 'LECTURE', 'ROUND_TABLE', 'SHORT_COURSE', 'WORKSHOP');

-- CreateEnum
CREATE TYPE "EventModality" AS ENUM ('IN_PERSON', 'ONLINE');

-- CreateTable
CREATE TABLE "Lecturer" (
    "id" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,

    CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "lecturerId" TEXT NOT NULL,
    "modality" "EventModality" NOT NULL,
    "abstract" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "link" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
