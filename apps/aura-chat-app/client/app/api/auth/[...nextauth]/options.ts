import type { CustomUser } from "@/types/global";
import type { AuthOptions, ISODateString } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("The user data isd", user);
      return true;
    },

    async session({
      session,
      user,
      token,
    }: {
      session: CustomSession;
      user: CustomUser;
      token: JWT;
    }) {
      session.user = user as CustomUser;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
