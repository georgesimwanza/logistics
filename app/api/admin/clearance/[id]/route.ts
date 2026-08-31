import { NextRequest, NextResponse } from "next/server";
import { updateClearanceForm, deleteClearanceForm } from "@/app/(Models)/clearance";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await updateClearanceForm(id, body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update clearance form:", err);
    return NextResponse.json(
      { error: "Failed to update clearance form" },
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
    await deleteClearanceForm(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete clearance form:", err);
    return NextResponse.json(
      { error: "Failed to delete clearance form" },
      { status: 500 },
    );
  }
}
