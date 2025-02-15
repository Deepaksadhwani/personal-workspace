import prisma from "../config/db.config";

export const getChats = async (groupId: string) => {
  const chats = await prisma.chats.findMany({
    where: {
      group_id: groupId,
    },
  });
  return chats;
};
