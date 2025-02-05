import prisma from "../config/db.config";
import type { LoginPayLoadType } from "../types/global";

export async function findUser(body: LoginPayLoadType) {
  let findUser = await prisma.users.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!findUser) {
    findUser = await prisma.users.create({
      data: body,
    });
  }
  return findUser;
}
