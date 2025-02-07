// types/express.d.ts
import { Request } from "express";

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
