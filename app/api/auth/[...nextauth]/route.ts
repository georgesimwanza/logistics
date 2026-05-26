import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToMongodb from "@/app/lib/connect";
import User from "@/app/(Models)/user";
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

        await connectToMongodb();

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;

        return { id: user._id.toString(), email: user.email, name: user.name };
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
