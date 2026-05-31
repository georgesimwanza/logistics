import ClearanceSchema from "@/app/(Models)/clearance";
import connectToMongodb from "@/app/lib/connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      CargoType,
      Country,
      EntryPoint,
      Value,
      Fullname,
      Phone,
      ADN,
      Make,
      Model,
      Year,
    } = body;

    // Required field validation
    const missing = [];
    if (!CargoType) missing.push("CargoType");
    if (!Country) missing.push("Country");
    if (!EntryPoint) missing.push("EntryPoint");
    if (!Value) missing.push("Value");
    if (!Fullname) missing.push("Fullname");
    if (!Phone) missing.push("Phone");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    // Vehicle fields required when cargo type is motor vehicle
    if (CargoType === "Motor vehicle" && (!Make || !Model || !Year)) {
      return NextResponse.json(
        {
          error:
            "Make, Model, and Year are required for motor vehicle shipments",
        },
        { status: 400 },
      );
    }

    await connectToMongodb();

    const clearance = await ClearanceSchema.create({
      CargoType,
      Country,
      EntryPoint,
      Value,
      FullName: Fullname,
      Phone,
      ADN: ADN || "",
      Make: Make || "",
      Model: Model || "",
      Year: Year || "",
    });

    return NextResponse.json(
      { success: true, id: clearance._id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to save clearance request:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
