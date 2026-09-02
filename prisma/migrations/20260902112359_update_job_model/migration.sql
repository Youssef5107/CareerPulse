-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "companyOverview" TEXT,
ADD COLUMN     "expirationDate" TIMESTAMP(3),
ADD COLUMN     "locationType" TEXT NOT NULL DEFAULT 'onsite',
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'PUBLIC',
ALTER COLUMN "isExpired" SET DEFAULT false;
