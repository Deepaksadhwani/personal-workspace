import express from "express";
import {
  createChatGroupcontroller,
  deleteChatGroupController,
  findChatGroupController,
  findChatGroupsController,
  updateChatGroupController,
} from "../controllers/chat-group-controller";
import authMiddleware from "../middlewares/auth-middleware";

export const chatGroupRouter = express.Router();

chatGroupRouter.get("/chat-group", authMiddleware, findChatGroupsController);
chatGroupRouter.get("/chat-group/:id", authMiddleware, findChatGroupController);
chatGroupRouter.post("/chat-group", authMiddleware, createChatGroupcontroller);
chatGroupRouter.put(
  "/chat-group/:id",
  authMiddleware,
  updateChatGroupController,
);
chatGroupRouter.delete(
  "/chat-group/:id",
  authMiddleware,
  deleteChatGroupController,
);
