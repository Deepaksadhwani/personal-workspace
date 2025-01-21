"use server";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { getMember } from "@/features/members/utils";
import type { Workspace } from "@/features/workspaces/types";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { createAppwriteClient } from "personal-workspace/ui/src/libs/appwrite";

export const getWorkspaces = async () => {
  const session = (await cookies()).get(AUTH_COOKIE);
  if (!session) return { documents: [], total: 0 };

  const { databases, user } = await createAppwriteClient({
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "",
    session: session.value,
  });

  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("userId", user.$id),
  ]);

  if (members.total === 0) {
    return { documents: [], total: 0 };
  }

  const workspaceIds = members.documents.map((member) => member.workspaceId);

  const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [
    Query.orderDesc("$createdAt"),
    Query.contains("$id", workspaceIds),
  ]);
  return workspaces;
};
