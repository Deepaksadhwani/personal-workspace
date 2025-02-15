import type { Request, Response } from "express";
import { createChatGroupUser, getChatGroupUser } from "../services/group-users";

export const getChatGroupUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { group_id } = req.query;
    const users = await getChatGroupUser(group_id as string);

    return res.json({ message: "Data fetched successfully", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createChatGroupUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const body = req.body;
    const users = await createChatGroupUser(body);

    return res.json({ message: "User added successfully", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
