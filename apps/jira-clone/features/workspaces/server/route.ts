import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { createWorkspaceValidator } from "./middleware";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID);
    return c.json({ data: workspaces });
  })
  .post("/", createWorkspaceValidator, sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const storage = c.get("storage");
    const { name, image } = c.req.valid("form");

    let uploadImageUrl: string | undefined;

    if (image instanceof File) {
      const file = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        image,
      );

      const arrayBuffer = await storage.getFileView(IMAGES_BUCKET_ID, file.$id);

      uploadImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    }

    const workspaces = await databases.createDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      ID.unique(),
      {
        name,
        userId: user.$id,
        imageUrl: uploadImageUrl,
      },
    );
    return c.json({ data: workspaces });
  }); // => /api/workspaces
export default app;
