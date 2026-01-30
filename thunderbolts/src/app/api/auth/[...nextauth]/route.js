import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
async authorize(credentials) {
  try {
    console.log("authorize called with:", credentials);

    await connectDB();
    console.log("DB connected");

    if (!credentials?.email || !credentials?.password) {
      console.log("Missing email/password");
      return null;
    }

    const user = await User.findOne({ 
      email: credentials.email.toLowerCase() 
    }).lean();   // ← lean() is faster for read-only

    if (!user) {
      console.log("No user found for:", credentials.email);
      return null;
    }

    console.log("User found:", user.email, "role:", user.role);

    const isValid = await bcrypt.compare(credentials.password, user.password);
    console.log("Password valid?", isValid);

    if (!isValid) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name || null,
      role: user.role   // ← this is what matters
    };
  } catch (err) {
    console.error("Authorize crashed:", err);
    return null;
  }
},
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/log-in",
    error: "/log-in", // Redirect back to login on error
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };