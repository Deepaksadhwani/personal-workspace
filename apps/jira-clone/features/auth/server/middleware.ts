import { loginSchema, registerSchema } from "@/features/auth/schemas";
import { validateInviteCodeSchema } from "@/features/workspaces/schemas";
import { zValidator } from "@hono/zod-validator";

export const loginValidator = zValidator("json", loginSchema);
export const registerValidator = zValidator("json", registerSchema);
export const inviteCodeValidator = zValidator("json", validateInviteCodeSchema);
