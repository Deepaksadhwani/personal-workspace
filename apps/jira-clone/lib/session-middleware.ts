import "server-only";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { createAppwriteClient } from "personal-workspace/ui/src/libs/appwrite";
import type { AdditionalContext } from "personal-workspace/ui/src/types/global";

const endPoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const session = getCookie(c, AUTH_COOKIE);
    if (!session) {
      return c.json({ error: "Not authenticated" }, 401);
    }
    const { account, databases, storage, user } = await createAppwriteClient({
      endpoint: endPoint,
      projectId: projectId,
      session,
    });

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  },
);
