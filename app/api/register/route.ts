import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDb from "@/app/lib/connect";
import User from "@/app/(Models)/user";

export async function POST(req: NextRequest) {
  try {
    const { username, email, role, number, location, password } =
      await req.json();

    // 1. Validate first (no DB needed)
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // 2. Connect to DB BEFORE any DB operations
    console.log("connecting to the database");
    await connectToMongoDb();
    console.log("connected");

    // 3. Now it's safe to query
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Save with correct field name
    await User.create({
      username,
      email,
      role,
      number,
      location,
      password: hashedPassword, // ✅ not hashedPassword
    });

    return NextResponse.json(
      { message: "Registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
