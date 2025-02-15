import express from "express";
import {
  createChatGroupUserController,
  getChatGroupUserController,
} from "../controllers/chat-group-user-controller";

export const groupUsersRouter = express.Router();

groupUsersRouter.get("/chat-group-users", getChatGroupUserController);
groupUsersRouter.post("/chat-group-users", createChatGroupUserController);
