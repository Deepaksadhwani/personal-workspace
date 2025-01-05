"use server";

import { DATABASE_ID, PROJECTS_ID } from "@/config";
import type { Project } from "@/features/projects/types";
import { cookies } from "next/headers";
import { createAppwriteClient } from "personal-workspace/ui/src/libs/appwrite";
import { AUTH_COOKIE } from "../auth/constants";
import { getMember } from "../members/utils";

interface GetPorjectProps {
  projectId: string;
}

export const getProject = async ({ projectId }: GetPorjectProps) => {
  const session = (await cookies()).get(AUTH_COOKIE);
  if (!session) throw new Error("Unauthorized");

  const { databases, user } = await createAppwriteClient({
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "",
    session: session.value,
  });

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId,
  );
  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) throw new Error("Unauthorized ");

  return project;
};
