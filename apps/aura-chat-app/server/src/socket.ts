import type { Server, Socket } from "socket.io";
import prisma from "./config/db.config";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room;
    if (!room) {
      return next(new Error("room is required"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    socket.join(socket.room);

    socket.on("message", async (data) => {
      await prisma.chats.create({
        data,
      });
      socket.to(socket.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("the socket is disconnected", socket.id);
    });
  });
}
