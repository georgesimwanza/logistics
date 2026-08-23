// lib/cars.ts
import { adminDb } from "@/app/lib/firebaseAdmin";
import { randomUUID } from "node:crypto";

export interface Car {
  id?: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  acceleration: string;
  mpg: string;
  fuel: string;
  image: string[];
  badge: string;
}

const carsRef = adminDb.collection("cars");

export async function createCar(data: Omit<Car, "id">): Promise<string> {
  const id = randomUUID();
  await carsRef.doc(id).set({
    make: data.make,
    model: data.model,
    year: data.year,
    price: data.price,
    mileage: data.mileage,
    acceleration: data.acceleration,
    mpg: data.mpg,
    fuel: data.fuel,
    image: data.image ?? [],
    badge: data.badge,
  });
  return id;
}

export async function getCar(id: string): Promise<Car | null> {
  const doc = await carsRef.doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as Car) : null;
}

export async function getAllCars(): Promise<Car[]> {
  const snapshot = await carsRef.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Car));
}

export async function updateCar(id: string, data: Partial<Car>): Promise<void> {
  await carsRef.doc(id).update(data);
}

export async function deleteCar(id: string): Promise<void> {
  await carsRef.doc(id).delete();
}
