import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,

  trustHost: true,

  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user?.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return user;
      },
    }),
  ],

  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = (user as { role?: "JOB_SEEKER" | "EMPLOYER" | null }).role ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = (token.role as "JOB_SEEKER" | "EMPLOYER" | null) ?? null;
      }

      return session;
    },
  },
});
