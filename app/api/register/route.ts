import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/(Models)/user";

export async function POST(req: NextRequest) {
  try {
    const { username, email, role, number, location, password } =
      await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    try {
      await createUser({ username, email, role, number, location, password });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      if (message === "Email already in use") {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 400 },
        );
      }
      throw err;
    }

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
