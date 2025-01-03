"use server";

import { appwriteApiKey, appwriteEndpoint, appwriteProjectId } from "@/config";
import { createAppwriteAdminClient } from "personal-workspace/ui/src/libs/appwrite";

export const createAdminClient = async () => {
  const { account, users } = await createAppwriteAdminClient({
    endpoint: appwriteEndpoint,
    projectId: appwriteProjectId,
    apiKey: appwriteApiKey,
  });
  return { account, users };
};
