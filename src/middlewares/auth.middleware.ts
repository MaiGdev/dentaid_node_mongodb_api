import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../config";

export class AuthMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const payload = await JwtAdapter.verifyToken(token);

    if (!payload) return res.status(401).json({ message: "Invalid token" });

    req.body.user = payload;

    next();

    try {
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
