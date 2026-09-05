-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('ACTIVE', 'DRAFT', 'CLOSED');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'ACTIVE';
