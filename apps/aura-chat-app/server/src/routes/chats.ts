import express from "express";
import { getChatsController } from "../controllers/chats-controller";

export const chatsRouter = express.Router();

chatsRouter.get("/chats/:groupId", getChatsController);
