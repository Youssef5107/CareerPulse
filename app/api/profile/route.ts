import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mock retrieving currently authenticated user session ID
async function getAuthUserId() {
  // Replace with your authentication provider (e.g., NextAuth, Clerk)
  return "user_cuid_123456";
}

// 1. GET: Fetch complete user profile data
export async function GET() {
  try {
    const userId = await getAuthUserId();
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

// 2. PATCH: Update user basic details, CV URL, avatar, or skills
export async function PATCH(req: Request) {
  try {
    const userId = await getAuthUserId();
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        name:
          body.firstName && body.lastName
            ? `${body.firstName} ${body.lastName}`
            : undefined,
        email: body.email,
        image: body.image,
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
              headline: body.headline,
              location: body.location,
              phone: body.phone,
              summary: body.summary,
              cvUrl: body.cvUrl,
              skills: body.skills,
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
