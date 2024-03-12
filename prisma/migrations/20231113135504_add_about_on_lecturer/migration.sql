/*
  Warnings:

  - Added the required column `about` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecturer" ADD COLUMN     "about" TEXT NOT NULL;
