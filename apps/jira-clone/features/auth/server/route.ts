import { AUTH_COOKIE } from "@/features/auth/constants";
import {
  loginValidator,
  registerValidator,
} from "@/features/auth/server/middleware";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import {
  createAppWriteUser,
  loginAppwriteUser,
} from "personal-workspace/ui/src/libs/appwrite";
//Hono RPC
//use chaining to leverage Hono RPC benefits, automatic type inference, and validation

const appWriteValidationData = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string,
  apiKey: process.env.NEXT_APPWRITE_KEY as string,
};

const app = new Hono()
  .post("/login", loginValidator, async (c) => {
    const { email, password } = c.req.valid("json"); // valid("") should match zValidator in middleware, give us type safety
    const { session } = await loginAppwriteUser(appWriteValidationData, {
      email,
      password,
    });
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return c.json({ success: true });
  })
  .post("/register", registerValidator, async (c) => {
    const { name, email, password } = c.req.valid("json");
    const { user, session } = await createAppWriteUser(appWriteValidationData, {
      email,
      password,
      name,
    });

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return c.json({ data: user });
  })
  .post("/logout", async (c) => {
    deleteCookie(c, AUTH_COOKIE);
    return c.json({ success: true });
  });
export default app;

// const {email, password} = await c.req.json() // regular way to get the request body but does not give type safety
