import { z } from "zod";

export const createChatSchema = z.object({
  title: z.string().min(4, { message: "Chat title must be 4 characters" }),
  passcode: z
    .string()
    .min(4, { message: "Chat passcode must be 4 characters" }),
});

export type createChatType = z.infer<typeof createChatSchema>;
