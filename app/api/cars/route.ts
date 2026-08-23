import { getAllCars } from "@/app/(Models)/car";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cars = await getAllCars();
    return NextResponse.json({ success: true, data: cars }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch cars" },
      { status: 500 },
    );
  }
}
