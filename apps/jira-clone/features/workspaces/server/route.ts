import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config";
import { inviteCodeValidator } from "@/features/auth/server/middleware";
import { MemberRole } from "@/features/members/types";
import { getMember } from "@/features/members/utils";
import {
  createWorkspaceValidator,
  updateWorkspaceValidator,
} from "@/features/workspaces/server/middleware";
import type { Workspace } from "@/features/workspaces/types";
import { sessionMiddleware } from "@/lib/session-middleware";
import { generateInviteCode } from "@/lib/utils";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { validateInviteCodeSchema } from "../schemas";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return c.json({
        data: { documents: [], total: 0 } as unknown as typeof workspaces,
      });
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)],
    );
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
      WORKSPACES_ID,
      ID.unique(),
      {
        name,
        userId: user.$id,
        imageUrl: uploadImageUrl,
        inviteCode: generateInviteCode(6),
      },
    );

    await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
      userId: user.$id,
      workspaceId: workspaces.$id,
      role: MemberRole.ADMIN,
    });

    return c.json({ data: workspaces });
  }) // => /api/workspaces
  .patch(
    "/:workspaceId",
    updateWorkspaceValidator,
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { workspaceId } = c.req.param();
      const { name, image } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({ message: "Workspace not found" }, 401);
      }

      let uploadImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );

        const arrayBuffer = await storage.getFileView(
          IMAGES_BUCKET_ID,
          file.$id,
        );

        uploadImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      } else {
        uploadImageUrl = image;
      }
      const workspaces = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId,
        { name, imageUrl: uploadImageUrl },
      );

      return c.json({ data: workspaces });
    },
  )
  .delete("/:workspaceId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const { workspaceId } = c.req.param();

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    //  TODO: Delete all tasks, projects, and members
    await databases.deleteDocument(DATABASE_ID, WORKSPACES_ID, workspaceId);

    return c.json({ data: { $id: workspaceId } });
  })
  .post("/:workspaceId/reset-invite-code", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const { workspaceId } = c.req.param();

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const workspace = await databases.updateDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId,
      {
        inviteCode: generateInviteCode(6),
      },
    );

    return c.json({ data: workspace });
  })
  .post(
    "/:workspaceId/join",
    sessionMiddleware,
    inviteCodeValidator,
    async (c) => {
      const { workspaceId } = c.req.param();
      const { code } = c.req.valid("json");

      const databases = c.get("databases");
      const user = c.get("user");

      const member = await getMember({
        workspaceId,
        userId: user.$id,
        databases,
      });

      if (member) {
        return c.json({ message: "Already a member" }, 400);
      }

      const workspace = await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId,
      );

      if (workspace.inviteCode !== code) {
        return c.json({ error: "Invalid invite code" }, 400);
      }

      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId,
        role: MemberRole.MEMBER,
      });
      return c.json({ data: workspace });
    },
  );

export default app;
