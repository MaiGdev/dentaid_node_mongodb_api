import { Response } from "express";
import { CustomError } from "../../domain";

export const handleCustomError = (err: unknown, res: Response) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal server error", error: { err } });
};
