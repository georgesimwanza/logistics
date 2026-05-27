import connectToMongodb from "@/app/lib/connect";
import Car from "@/app/(Models)/car";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongodb();
    const cars = await Car.find({});
    return NextResponse.json({ success: true, data: cars }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch cars" },
      { status: 500 },
    );
  }
}
