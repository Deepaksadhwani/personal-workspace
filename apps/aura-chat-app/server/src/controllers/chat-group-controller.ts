import type { Request, Response } from "express";
import {
  createChatGroup,
  deleteChatGroup,
  getChatGroup,
  getChatGroups,
  updateChatGroup,
} from "../services/chat-group";

export async function findChatGroupsController(req: Request, res: Response) {
  try {
    const user = req.user;

    const groups = await getChatGroups(user.id);
    return res
      .status(201)
      .json({ message: "Chat groups fetched successfully", data: groups });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateChatGroupController(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const group = await updateChatGroup(body.title, body.passcode, id);
    return res
      .status(201)
      .json({ message: "Chat group updated successfully", data: group });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteChatGroupController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const group = await deleteChatGroup(id);
    return res
      .status(201)
      .json({ message: "Chat group deleted successfully", data: group });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function findChatGroupController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const group = await getChatGroup(id);
    return res
      .status(201)
      .json({ message: "Chat group fetched successfully", data: group });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createChatGroupcontroller(req: Request, res: Response) {
  try {
    const body = req.body;
    const user = req.user;
    const chatGroupPayload = {
      title: body.title,
      passcode: body.passcode,
      user_id: user.id,
    };
    await createChatGroup(chatGroupPayload);
    return res.status(201).json({ message: "Chat group created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
