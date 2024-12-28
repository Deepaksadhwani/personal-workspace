"use server";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { cookies } from "next/headers";
import { createAppwriteClient } from "personal-workspace/ui/src/libs/appwrite";

export const getCurrent = async () => {
  const session = (await cookies()).get(AUTH_COOKIE);
  if (!session) return null;

  try {
    const { user } = await createAppwriteClient({
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "",
      session: session.value,
    });

    return user;
  } catch (error) {
    return null;
  }
};
