import auth from "@/features/auth/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", auth); // /api/auth

// These handlers will process all GET/POST requests to /api/*
export const GET = handle(app);
export const POST = handle(app);

// Export app type for client-side type safety
export type AppType = typeof routes;
