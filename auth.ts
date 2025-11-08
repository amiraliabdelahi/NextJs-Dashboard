import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./app/config/db";
declare module "next-auth" {
  interface Session {
    user: {
      role: "user" | "admin";
    } & DefaultSession["user"];
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await prisma.users.findFirst({
        where: {
          id: token.sub,
        },
      });
      if (user) token.role = user.isAdmin;

      return token;
    },

    async session({ token, session }) {
      if (!token.role || !token.sub) return session;

      session.user.role = token.role as "user" | "admin";
      session.user.id = token.sub;

      return session;
    },
  },

  ...authConfig,
});
