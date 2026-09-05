import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // 1. Import NextAuth session helper

// Retrieve the actual authenticated user ID from NextAuth session
async function getAuthUserId() {
  const session = await auth();
  return session?.user?.id || null;
}

// 1. GET: Fetch complete user profile data
export async function GET() {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            experiences: true,
            educations: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

// app/api/profile/route.ts

export async function PATCH(req: Request) {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(body.firstName !== undefined && { firstName: body.firstName }),
        ...(body.lastName !== undefined && { lastName: body.lastName }),
        name:
          body.firstName && body.lastName
            ? `${body.firstName} ${body.lastName}`
            : undefined,
        ...(body.email !== undefined && { email: body.email }),
        ...(body.image !== undefined && { image: body.image }),
        profile: {
          upsert: {
            create: {
              headline: body.headline,
              location: body.location,
              phone: body.phone,
              summary: body.summary,
              cvUrl: body.cvUrl,
              skills: body.skills || [],
            },
            update: {
              ...(body.headline !== undefined && { headline: body.headline }),
              ...(body.location !== undefined && { location: body.location }),
              ...(body.phone !== undefined && { phone: body.phone }),
              ...(body.summary !== undefined && { summary: body.summary }),
              ...(body.cvUrl !== undefined && { cvUrl: body.cvUrl }),
              ...(body.skills !== undefined && { skills: body.skills }),
            },
          },
        },
      },
      include: {
        profile: {
          include: {
            experiences: true,
            educations: true,
          },
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}

// 3. POST: Add Experience or Education entries directly
export async function POST(req: Request) {
  try {
    const userId = await getAuthUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, data } = await req.json();

    // Fetch user's profile ID based on auth user
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (type === "experience") {
      const exp = await prisma.workExperience.create({
        data: {
          title: data.title,
          company: data.company,
          startDate: data.startDate,
          endDate: data.endDate,
          description: data.description,
          profileId: profile.id,
        },
      });
      return NextResponse.json(exp);
    }

    if (type === "education") {
      const edu = await prisma.education.create({
        data: {
          institution: data.institution,
          degree: data.degree,
          startDate: data.startDate,
          endDate: data.endDate,
          profileId: profile.id,
        },
      });
      return NextResponse.json(edu);
    }

    return NextResponse.json(
      { error: "Invalid type specified" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 },
    );
  }
}
