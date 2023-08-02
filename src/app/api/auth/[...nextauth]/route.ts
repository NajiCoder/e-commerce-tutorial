import { env } from "@/libs/env";
import { prisma } from "@/libs/db/prisma";

import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import { mergerAnonymousCartWithUserCart } from "@/libs/db/carts";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },

  // https://next-auth.js.org/configuration/events
  events: {
    async signIn({ user }) {
      await mergerAnonymousCartWithUserCart(user.id);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
