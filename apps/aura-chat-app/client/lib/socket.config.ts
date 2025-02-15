import env from "@/lib/env";
import { type Socket, io } from "socket.io-client";

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(env.BACKEND_URL, {
      autoConnect: false,
    });
  }

  return socket;
};
