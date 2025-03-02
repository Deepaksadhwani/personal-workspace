import auth from "@/features/auth/server/route";
import members from "@/features/members/server/route";
import projects from "@/features/projects/server/route";
import tasks from "@/features/tasks/server/route";
import workspaces from "@/features/workspaces/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth) // /api/auth
  .route("/workspaces", workspaces) // /api/workspaces
  .route("/members", members)
  .route("/projects", projects)
  .route("/tasks", tasks);

// These handlers will process all GET/POST requests to /api/*
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
// Export app type for client-side type safety
export type AppType = typeof routes;
