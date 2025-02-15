import type { Request, Response } from "express";
import { getChats } from "../services/chats";

export const getChatsController = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const chats = await getChats(groupId);
    return res.status(200).json({ data: chats });
  } catch (error) {
    return res.status(500).json({ messsage: "Internal server error." });
  }
};
