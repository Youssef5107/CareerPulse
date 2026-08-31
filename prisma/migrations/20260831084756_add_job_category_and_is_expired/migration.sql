/*
  Warnings:

  - Added the required column `category` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Made the column `salary` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "isExpired" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "salary" SET NOT NULL;
