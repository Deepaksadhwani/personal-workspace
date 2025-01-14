import type { Models } from "node-appwrite";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  IN_REVIEW = "IN_REVIEW",
}

export type Task = Models.Document & {
  name: string;
  status: TaskStatus;
  dueDate: string;
  assigneeId: string;
  projectId: string;
  position: number;
};
