"use server";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { cookies } from "next/headers";
import { Account, Databases, Query } from "node-appwrite";
import { createAppwriteClient } from "personal-workspace/ui/src/libs/appwrite";

export const getWorkspaces = async () => {
  const session = (await cookies()).get(AUTH_COOKIE);
  if (!session) return { documents: [], total: 0 };

  try {
    const { client } = await createAppwriteClient({
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "",
      session: session.value,
    });

    client.setSession(session.value);
    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get();
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)],
    );
    return workspaces;
  } catch (error) {
    return { documents: [], total: 0 };
  }
};
