import express from "express";
import { authRouter } from "../routes/auth";

export const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
