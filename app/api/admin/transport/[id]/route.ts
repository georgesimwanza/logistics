import { NextRequest, NextResponse } from "next/server";
import { deleteTransportForm } from "@/app/(Models)/transport";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteTransportForm(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete transport form:", err);
    return NextResponse.json(
      { error: "Failed to delete transport form" },
      { status: 500 },
    );
  }
}
