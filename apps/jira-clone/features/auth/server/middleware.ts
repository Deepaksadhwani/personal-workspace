import { validateInviteCodeSchema } from "@/features/workspaces/schemas";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";

export const loginValidator = zValidator("json", loginSchema);
export const registerValidator = zValidator("json", registerSchema);
export const inviteCodeValidator = zValidator("json", validateInviteCodeSchema);
