import prisma from "../config/db.config";
import type { ChatGroup } from "../types/global";

export async function getChatGroups(user_id: number) {
  const chatGroups = await prisma.chatGroup.findMany({
    where: {
      user_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return chatGroups;
}

export async function updateChatGroup(
  title: string,
  passcode: string,
  id: string,
) {
  const chatGroup = await prisma.chatGroup.update({
    data: {
      title: title,
      passcode: passcode,
    },
    where: {
      id,
    },
  });
  return chatGroup;
}
export async function deleteChatGroup(id: string) {
  const chatGroup = await prisma.chatGroup.delete({
    where: {
      id,
    },
  });
  return chatGroup;
}

export async function getChatGroup(user_id: string) {
  const chatGroup = await prisma.chatGroup.findUnique({
    where: {
      id: user_id,
    },
  });
  return chatGroup;
}

export async function createChatGroup(body: ChatGroup) {
  await prisma.chatGroup.create({
    data: {
      title: body.title,
      passcode: body.passcode,
      user_id: body.user_id,
    },
  });
}
