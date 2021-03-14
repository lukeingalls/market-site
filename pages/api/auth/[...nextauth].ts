import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DB_URI,

  callbacks: {
    async session(session, token) {
      session.user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      return session;
    },
  },
});
