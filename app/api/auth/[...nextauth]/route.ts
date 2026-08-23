import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminDb } from "@/app/lib/firebaseAdmin";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const usersRef = adminDb.collection("users");
        const snapshot = await usersRef
          .where("email", "==", credentials.email)
          .limit(1)
          .get();

        if (snapshot.empty) return null;

        const userDoc = snapshot.docs[0];
        const user = userDoc.data();

        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;

        return { id: userDoc.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
