// lib/users.ts
import { adminDb } from "@/app/lib/firebaseAdmin";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

export interface User {
  id?: string;
  username: string;
  email: string;
  number: string;
  location: string;
  password: string; // hashed, never store plaintext
  role: string;
}

const usersRef = adminDb.collection("users");

function validateUser(data: Partial<User>) {
  if (!data.username) throw new Error("Username is required");
  if (!data.email) throw new Error("Email is required");
  if (!data.number) throw new Error("Phone number is required");
  if (!data.password) throw new Error("Password is required");
  if (!data.role) throw new Error("Role is required");
}

export async function createUser(
  data: Omit<User, "id"> & { password: string } // raw password in, hashed before save
): Promise<string> {
  validateUser(data);

  // enforce unique email (Mongoose didn't have `unique: true` here either,
  // but worth adding since Firestore has no schema-level constraint)
  const existing = await usersRef.where("email", "==", data.email).limit(1).get();
  if (!existing.empty) throw new Error("Email already in use");

  const id = randomUUID();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await usersRef.doc(id).set({
    username: data.username,
    email: data.email,
    number: data.number,
    password: hashedPassword,
    role: data.role,
  });

  return id;
}

export async function getUserById(id: string): Promise<User | null> {
  const doc = await usersRef.doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as User) : null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const snapshot = await usersRef.where("email", "==", email).limit(1).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as User;
}

export async function updateUser(id: string, data: Partial<User>): Promise<void> {
  await usersRef.doc(id).update(data);
}

export async function deleteUser(id: string): Promise<void> {
  await usersRef.doc(id).delete();
}
