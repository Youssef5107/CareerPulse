import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ "post-id": string }>;
}

export async function PATCH(request: Request, context: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { "post-id": postId } = await context.params;
    const { status } = await request.json();

    if (!["ACTIVE", "DRAFT", "CLOSED"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const updatedJob = await prisma.job.update({
      where: { id: postId, postedById: session.user.id },
      data: { status },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating post status:", error);
    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 },
    );
  }
}
