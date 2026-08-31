import { NextRequest, NextResponse } from "next/server";
import { updateCar, deleteCar } from "@/app/(Models)/car";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await updateCar(id, body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update car:", err);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteCar(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete car:", err);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 },
    );
  }
}
