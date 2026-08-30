import { NextRequest, NextResponse } from "next/server";
import { getAllClearanceForms } from "@/app/(Models)/clearance";

export async function GET() {
  try {
    const forms = await getAllClearanceForms();
    // Most recent first
    forms.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
    return NextResponse.json({ forms });
  } catch (err) {
    console.error("Failed to fetch clearance forms:", err);
    return NextResponse.json(
      { error: "Failed to load clearance forms" },
      { status: 500 },
    );
  }
}
