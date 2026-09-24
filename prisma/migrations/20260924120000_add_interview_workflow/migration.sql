CREATE TYPE "InterviewMode" AS ENUM ('ONSITE', 'ONLINE');

CREATE TYPE "InterviewStatus" AS ENUM (
  'PENDING_JOBSEEKER',
  'PENDING_EMPLOYER',
  'ACCEPTED',
  'REJECTED'
);

CREATE TYPE "InterviewProposedBy" AS ENUM ('EMPLOYER', 'JOBSEEKER');

ALTER TYPE "NotificationType" ADD VALUE 'INTERVIEW_PROPOSED';
ALTER TYPE "NotificationType" ADD VALUE 'INTERVIEW_UPDATED';

CREATE TABLE "Interview" (
  "id" TEXT NOT NULL,
  "applicationId" TEXT NOT NULL,
  "employerId" TEXT NOT NULL,
  "jobSeekerId" TEXT NOT NULL,
  "proposedAt" TIMESTAMP(3) NOT NULL,
  "mode" "InterviewMode" NOT NULL,
  "details" TEXT NOT NULL,
  "status" "InterviewStatus" NOT NULL DEFAULT 'PENDING_JOBSEEKER',
  "proposedBy" "InterviewProposedBy" NOT NULL DEFAULT 'EMPLOYER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Interview_applicationId_key" ON "Interview"("applicationId");
CREATE INDEX "Interview_employerId_status_idx" ON "Interview"("employerId", "status");
CREATE INDEX "Interview_jobSeekerId_status_idx" ON "Interview"("jobSeekerId", "status");

ALTER TABLE "Interview"
  ADD CONSTRAINT "Interview_applicationId_fkey"
  FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Interview"
  ADD CONSTRAINT "Interview_employerId_fkey"
  FOREIGN KEY ("employerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Interview"
  ADD CONSTRAINT "Interview_jobSeekerId_fkey"
  FOREIGN KEY ("jobSeekerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;