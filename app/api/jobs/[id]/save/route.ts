// app/api/jobs/[id]/save/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = params instanceof Promise ? await params : params;
    const jobId = resolvedParams?.id;
    const userId = session.user.id;

    if (!jobId) {
      return NextResponse.json({ error: "Invalid Job ID" }, { status: 400 });
    }

    const existingSave = await prisma.savedJob.findUnique({
      where: {
        userId_jobId: { userId, jobId },
      },
    });

    if (existingSave) {
      await prisma.savedJob.delete({
        where: { id: existingSave.id },
      });
      return NextResponse.json({ isSaved: false }, { status: 200 });
    } else {
      await prisma.savedJob.create({
        data: { userId, jobId },
      });
      return NextResponse.json({ isSaved: true }, { status: 200 });
    }
  } catch (error) {
    console.error("Save route exception:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
