import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  if (role !== "JOB_SEEKER" && role !== "EMPLOYER") {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with that email already exists." },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  return NextResponse.json({ success: true });
}
