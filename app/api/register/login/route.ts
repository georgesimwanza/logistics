import { getUserByEmail } from "@/app/(Models)/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "all fields required" },
        { status: 400 },
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
