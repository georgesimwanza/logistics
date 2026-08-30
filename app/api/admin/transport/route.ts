import { NextResponse } from "next/server";
import { getAllTransportForms } from "@/app/(Models)/transport";

export async function GET() {
  try {
    const forms = await getAllTransportForms();
    forms.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
    return NextResponse.json({ forms });
  } catch (err) {
    console.error("Failed to fetch transport forms:", err);
    return NextResponse.json(
      { error: "Failed to load transport forms" },
      { status: 500 },
    );
  }
}
