import type { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

// Create type-safe HTTP client instance
export const client = hc<AppType>(
  process.env.NEXT_PUBLIC_API_URL || "https://deepak-jira-clone.vercel.app",
);
