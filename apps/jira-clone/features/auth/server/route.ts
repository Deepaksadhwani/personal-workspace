import { AUTH_COOKIE } from "@/features/auth/constants";
import {
  loginValidator,
  registerValidator,
} from "@/features/auth/server/middleware";
import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import {
  createAppWriteAdminUser,
  loginAppwriteAdminUser,
} from "personal-workspace/ui/src/libs/appwrite";
//Hono RPC
//use chaining to leverage Hono RPC benefits, automatic type inference, and validation

const appWriteValidationData = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string,
  apiKey: process.env.NEXT_APPWRITE_KEY as string,
};

const app = new Hono()
  .get("/current", sessionMiddleware, (c) => {
    const user = c.get("user");
    return c.json({ data: user });
  })
  .post("/login", loginValidator, async (c) => {
    // const {email, password} = await c.req.json() // regular way to get the request body but does not give type safety
    const { email, password } = c.req.valid("json"); // valid("") should match zValidator in middleware, give us type safety
    const { session } = await loginAppwriteAdminUser(appWriteValidationData, {
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
    const { user, session } = await createAppWriteAdminUser(
      appWriteValidationData,
      {
        email,
        password,
        name,
      },
    );
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return c.json({ data: user });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");
    return c.json({ success: true });
  });
export default app;
