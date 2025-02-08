import { Response } from "express";
import { CustomError } from "../../domain";

export const handleCustomError = (err: unknown, res: Response) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err && typeof err === "object" && "message" in err) {
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: (err as { message: string }).message,
      });
  }

 
  res
    .status(500)
    .json({ message: "Internal server error", error: "Unknown error" });
};
