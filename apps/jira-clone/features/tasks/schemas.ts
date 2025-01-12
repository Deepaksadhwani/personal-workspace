import { TaskStatus } from "@/features/tasks/types";
import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
  workspaceId: z.string().trim().min(1, "Workspace is required"),
  projectId: z.string().trim().min(1, "Project is required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Assignee is required"),
});

export const getTaskSchema = z.object({
  workspaceId: z.string(),
  projectId: z.string().nullish(),
  assigneeId: z.string().nullish(),
  status: z.nativeEnum(TaskStatus).nullish(),
  dueDate: z.string().nullish(),
  search: z.string().nullish(),
});
