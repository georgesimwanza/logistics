// lib/transportForms.ts
import { adminDb } from "@/app/lib/firebaseAdmin";
import { randomUUID } from "node:crypto";

export interface TransportForm {
  id?: string;
  serviceType?: string;
  pickup: string;
  delivery: string;
  date: string;
  weight?: string;
  cargoType: string;
  units?: string;
  insurance?: string;
  name: string;
  phone: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const transportRef = adminDb.collection("transportForms");

function validateTransportForm(data: Partial<TransportForm>) {
  if (!data.pickup) throw new Error("Pickup location is required");
  if (!data.delivery) throw new Error("Delivery location is required");
  if (!data.date) throw new Error("Date is required");
  if (!data.cargoType) throw new Error("Cargo type is required");
  if (!data.name) throw new Error("Name is required");
  if (!data.phone) throw new Error("Phone number is required");
}

export async function createTransportForm(
  data: Omit<TransportForm, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  validateTransportForm(data);
  const id = randomUUID();
  const now = new Date().toISOString();

  await transportRef.doc(id).set({
    serviceType: data.serviceType ?? "",
    pickup: data.pickup,
    delivery: data.delivery,
    date: data.date,
    weight: data.weight ?? "",
    cargoType: data.cargoType,
    units: data.units ?? "",
    insurance: data.insurance ?? "",
    name: data.name,
    phone: data.phone,
    notes: data.notes ?? "",
    createdAt: now,
    updatedAt: now,
  });

  return id;
}

export async function getTransportForm(id: string): Promise<TransportForm | null> {
  const doc = await transportRef.doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as TransportForm) : null;
}

export async function getAllTransportForms(): Promise<TransportForm[]> {
  const snapshot = await transportRef.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TransportForm));
}

export async function updateTransportForm(
  id: string,
  data: Partial<TransportForm>
): Promise<void> {
  await transportRef.doc(id).update({ ...data, updatedAt: new Date().toISOString() });
}

export async function deleteTransportForm(id: string): Promise<void> {
  await transportRef.doc(id).delete();
}
