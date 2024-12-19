"use server";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { cookies } from "next/headers";
import { Account } from "node-appwrite";
import { createAppwriteClient } from "personal-workspace/ui/src/libs/appwrite";

export const getCurrent = async () => {
  const session = (await cookies()).get(AUTH_COOKIE);
  if (!session) return null;

  try {
    const { client } = await createAppwriteClient({
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "",
      session: session.value,
    });

    client.setSession(session.value);
    const account = new Account(client);
    return await account.get();
  } catch (error) {
    return null;
  }
};
