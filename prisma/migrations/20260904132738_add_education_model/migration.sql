-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "bannerUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
