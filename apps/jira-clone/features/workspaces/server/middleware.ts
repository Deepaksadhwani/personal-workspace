import { createWorkspaceSchema } from "@/features/workspaces/schemas";
import { zValidator } from "@hono/zod-validator";

export const createWorkspaceValidator = zValidator(
  "form",
  createWorkspaceSchema,
);
