import { createServer } from "node:http";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import redis from "./config/redis.config";
import { rootRouter } from "./routes";
import { setupSocket } from "./socket";

dotenv.config();
const app = express();

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
  adapter: createAdapter(redis),
});

setupSocket(io);

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).send("Server is working");
  } catch (error) {
    res.status(500).send("Internal server found.");
  }
});
app.use("/api", rootRouter);
server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
