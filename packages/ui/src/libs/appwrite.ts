import "server-only";
import { Account, Client, Databases, ID, Storage, Users } from "node-appwrite";
import type {
  AppwriteClientTypes,
  LoginUserAppwriteTypes,
  createUserAppwriteTypes,
} from "../types/global";

export async function createAppwriteClient({
  endpoint,
  projectId,
  apiKey,
}: AppwriteClientTypes) {
  const client = new Client();
  client
    .setEndpoint(endpoint || "")
    .setProject(projectId || "")
    .setKey(apiKey || "");

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAppWriteUser(
  appWriteValidationData: AppwriteClientTypes,
  { email, password, name }: createUserAppwriteTypes,
) {
  const { account } = await createAppwriteClient(appWriteValidationData);
  const user = await account.create(ID.unique(), email, password, name);

  const session = await account.createEmailPasswordSession(email, password);

  return { user, session };
}

export async function loginAppwriteUser(
  appWriteValidationData: AppwriteClientTypes,
  { email, password }: LoginUserAppwriteTypes,
) {
  const { account } = await createAppwriteClient(appWriteValidationData);
  const session = await account.createEmailPasswordSession(email, password);

  return { session };
}
