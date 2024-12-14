import {
  loginValidator,
  registerValidator,
} from "@/features/auth/server/middleware";
import { Hono } from "hono";

//Hono RPC
//use chaining to leverage Hono RPC benefits, automatic type inference, and validation

const app = new Hono()
  .post("/login", loginValidator, async (c) => {
    const { email, password } = c.req.valid("json"); // valid("") should match zValidator in middleware, give us type safety
    console.log({ email, password });
    return c.json({ email, password });
  })
  .post("/register", registerValidator, async (c) => {
    const { name, email, password } = c.req.valid("json");
    return c.json({ name, email, password });
  });
export default app;

// const {email, password} = await c.req.json() // regular way to get the request body but does not give type safety
