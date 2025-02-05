import { LOGIN_ENDPOINT } from "@/lib/api-endpoint";
import type { CustomUser } from "@/types/global";
import axios from "axios";
import type { Account, AuthOptions, ISODateString } from "next-auth";
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
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        const payload = {
          email: user.email,
          name: user.name,
          oauth_id: account?.providerAccountId,
          provider: account?.provider,
          image: user?.image,
        };
        const { data } = await axios.post(LOGIN_ENDPOINT, payload);
        user.id = data?.user?.id.toString();
        user.token = data?.user?.token;
        user.provider = data?.user?.provider;

        return true;
      } catch (error) {
        return false;
      }
    },

    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (token.user) {
        session.user = token.user as CustomUser;
      }
      return session;
    },

    async jwt({ token, user, account }) {
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
