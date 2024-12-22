import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { createWorkspaceValidator } from "./middleware";

const app = new Hono().post(
  "/",
  createWorkspaceValidator,
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const { name } = c.req.valid("json");
    const workspaces = await databases.createDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      ID.unique(),
      {
        name,
        userId: user.$id,
      },
    );
    return c.json({ data: workspaces });
  },
); // => /api/workspaces
export default app;
