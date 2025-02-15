import express from "express";
import { authRouter } from "../routes/auth";
import { chatGroupRouter } from "./chat-group";
import { chatsRouter } from "./chats";
import { groupUsersRouter } from "./group-users";

export const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use(chatGroupRouter);
rootRouter.use(groupUsersRouter);
rootRouter.use(chatsRouter);
