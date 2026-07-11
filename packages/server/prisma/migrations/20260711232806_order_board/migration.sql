/*
  Warnings:

  - Added the required column `order` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "order" TEXT NOT NULL;
