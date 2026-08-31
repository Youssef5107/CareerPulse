-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "benefits" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[];
