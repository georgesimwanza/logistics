import { createTransportForm } from "@/app/(Models)/transport";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("BODY:", JSON.stringify(body));

    const {
      serviceType,
      pickup,
      delivery,
      date,
      weight,
      cargoType,
      units,
      insurance,
      name,
      phone,
      notes,
    } = body;

    if (
      !cargoType ||
      !serviceType ||
      !pickup ||
      !delivery ||
      !date ||
      !name ||
      !phone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await createTransportForm({
      serviceType,
      pickup,
      delivery,
      date,
      weight,
      cargoType,
      units,
      insurance,
      name,
      phone,
      notes,
    });

    return NextResponse.json(
      { success: true, message: "Booking received" },
      { status: 201 },
    );
  } catch (err) {
    console.error("Transport booking error:", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
