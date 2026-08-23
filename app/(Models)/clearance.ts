// lib/clearanceForms.ts
import { adminDb } from "@/app/lib/firebaseAdmin";
import { randomUUID } from "node:crypto";

export type CargoType =
  | "Motor vehicle"
  | "Commercial goods"
  | "Personal effects"
  | "Machinery & equipment";

export type ClearanceStatus =
  | "Submitted"
  | "Agent assigned"
  | "At customs"
  | "Released";

export interface ClearanceForm {
  id?: string;
  CargoType: CargoType;
  Country: string;
  EntryPoint: string;
  Value: string;
  FullName: string;
  Phone: string;
  ADN?: string;
  Make?: string;
  Model?: string;
  Year?: string;
  Status: ClearanceStatus;
  createdAt?: string;
  updatedAt?: string;
}

const CARGO_TYPES: CargoType[] = [
  "Motor vehicle",
  "Commercial goods",
  "Personal effects",
  "Machinery & equipment",
];

const clearanceRef = adminDb.collection("clearanceForms");

function validateClearanceForm(data: Partial<ClearanceForm>) {
  if (!data.CargoType || !CARGO_TYPES.includes(data.CargoType)) {
    throw new Error("Cargo type is required and must be a valid type");
  }
  if (!data.Country) throw new Error("Country of origin is required");
  if (!data.EntryPoint) throw new Error("Entry point is required");
  if (!data.Value) throw new Error("Estimated value is required");
  if (!data.FullName) throw new Error("Full name is required");
  if (!data.Phone) throw new Error("Phone number is required");
}

export async function createClearanceForm(
  data: Omit<ClearanceForm, "id" | "createdAt" | "updatedAt" | "Status">
): Promise<string> {
  validateClearanceForm(data);
  const id = randomUUID();
  const now = new Date().toISOString();

  await clearanceRef.doc(id).set({
    CargoType: data.CargoType,
    Country: data.Country.trim(),
    EntryPoint: data.EntryPoint.trim(),
    Value: data.Value.trim(),
    FullName: data.FullName.trim(),
    Phone: data.Phone.trim(),
    ADN: data.ADN?.trim() ?? "",
    Make: data.Make?.trim() ?? "",
    Model: data.Model?.trim() ?? "",
    Year: data.Year?.trim() ?? "",
    Status: "Submitted" as ClearanceStatus,
    createdAt: now,
    updatedAt: now,
  });

  return id;
}

export async function getClearanceForm(id: string): Promise<ClearanceForm | null> {
  const doc = await clearanceRef.doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as ClearanceForm) : null;
}

export async function getAllClearanceForms(): Promise<ClearanceForm[]> {
  const snapshot = await clearanceRef.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ClearanceForm));
}

export async function updateClearanceForm(
  id: string,
  data: Partial<ClearanceForm>
): Promise<void> {
  await clearanceRef.doc(id).update({ ...data, updatedAt: new Date().toISOString() });
}

export async function deleteClearanceForm(id: string): Promise<void> {
  await clearanceRef.doc(id).delete();
}
