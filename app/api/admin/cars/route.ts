import { NextRequest, NextResponse } from "next/server";
import { getAllCars, createCar} from "@/app/(Models)/car";
export async function GET() {
  try {
    const cars = await getAllCars();
    return NextResponse.json({ cars });
  } catch (err) {
    console.error("Failed to fetch cars:", err);
    return NextResponse.json(
      { error: "Failed to load cars" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { make, model, year, price, mileage, acceleration, mpg, fuel, image, badge } =
      body;

    const missing: string[] = [];
    if (!make) missing.push("make");
    if (!model) missing.push("model");
    if (!year) missing.push("year");
    if (!price) missing.push("price");
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const id = await createCar({
      make,
      model,
      year,
      price,
      mileage: mileage ?? "",
      acceleration: acceleration ?? "",
      mpg: mpg ?? "",
      fuel: fuel ?? "",
      image: Array.isArray(image) ? image : [],
      badge: badge ?? "",
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("Failed to create car:", err);
    return NextResponse.json(
      { error: "Failed to create car" },
      { status: 500 },
    );
  }
}
