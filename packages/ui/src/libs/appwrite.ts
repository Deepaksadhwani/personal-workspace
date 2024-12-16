import "server-only";
import { Account, Client, Databases, ID, Storage, Users } from "node-appwrite";
import type {
  AppwriteAdminClientTypes,
  AppwriteClientTypes,
  LoginUserAppwriteTypes,
  createUserAppwriteTypes,
} from "../types/global";

export async function createAppwriteAdminClient({
  endpoint,
  projectId,
  apiKey,
}: AppwriteAdminClientTypes) {
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

export async function createAppWriteAdminUser(
  appWriteValidationData: AppwriteAdminClientTypes,
  { email, password, name }: createUserAppwriteTypes,
) {
  const { account } = await createAppwriteAdminClient(appWriteValidationData);
  const user = await account.create(ID.unique(), email, password, name);

  const session = await account.createEmailPasswordSession(email, password);

  return { user, session };
}

export async function loginAppwriteAdminUser(
  appWriteValidationData: AppwriteAdminClientTypes,
  { email, password }: LoginUserAppwriteTypes,
) {
  const { account } = await createAppwriteAdminClient(appWriteValidationData);
  const session = await account.createEmailPasswordSession(email, password);

  return { session };
}

export async function createAppwriteClient({
  endpoint,
  projectId,
  session,
}: AppwriteClientTypes) {
  const client = new Client();
  client.setEndpoint(endpoint || "").setProject(projectId || "");

  client.setSession(session);
  const account = new Account(client);
  const storage = new Storage(client);
  const databases = new Databases(client);
  const user = await account.get();
  return {
    client,
    account,
    storage,
    user,
    databases,
  };
}
