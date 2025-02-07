import express from "express";
import { authRouter } from "../routes/auth";
import { chatGroupRouter } from "./chat-group";

export const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use(chatGroupRouter);
