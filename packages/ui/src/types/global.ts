import type { Account, Databases, Models, Storage, Users } from "node-appwrite";

export type AppwriteAdminClientTypes = {
  endpoint: string;
  projectId: string;
  apiKey: string;
};

export type createUserAppwriteTypes = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserAppwriteTypes = {
  email: string;
  password: string;
};

export type AppwriteClientTypes = Omit<AppwriteAdminClientTypes, "apiKey"> & {
  session: string;
};

// addtinonal context for hono for generate client appwrite
export type AdditionalContext = {
  Variables: {
    account: Account;
    databases: Databases;
    storage: Storage;
    users: Users;
    user: Models.User<Models.Preferences>;
  };
};
