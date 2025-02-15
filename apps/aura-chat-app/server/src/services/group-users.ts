import prisma from "../config/db.config";

export const getChatGroupUser = async (groupId: string) => {
  const users = await prisma.groupUsers.findMany({
    where: {
      group_id: groupId,
    },
  });
  return users;
};

export const createChatGroupUser = async (data) => {
  const users = await prisma.groupUsers.create({
    data,
  });
  return users;
};
