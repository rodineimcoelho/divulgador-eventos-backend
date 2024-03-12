/*
  Warnings:

  - Added the required column `imageName` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecturer" ADD COLUMN     "imageName" TEXT NOT NULL;
