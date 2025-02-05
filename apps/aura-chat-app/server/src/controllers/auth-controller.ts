import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUser } from "../services/users";
import type { LoginPayLoadType } from "../types/global";

export const loginController = async (req: Request, res: Response) => {
  try {
    const body: LoginPayLoadType = req.body;
    const user = await findUser(body);

    const jwtPayLoad = {
      name: body.name,
      email: body.email,
      id: user.id,
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(jwtPayLoad, process.env.JWT_SECRET, {
      expiresIn: "16d",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        ...user,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
