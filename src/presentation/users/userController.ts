import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsersByUserTypeFilter = async (req: Request, res: Response) => {
    try {
      const { userType } = req.query;

      if (!userType) {
        return res
          .status(400)
          .json({ message: "userType parameter is required" });
      }
      const users = await this.userService.getUsersByUserType(String(userType));

      if (!users)
        return res.status(404).json({ message: "Users could not be found" });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  getUserByUserTypeId = async (req: Request, res: Response) => {
    const { id, userType } = req.query;

    if (!id || !userType) {
      return res.status(400).json({ message: "id and userType are required" });
    }

    try {
      const user = await this.userService.getUserByUserTypeId(
        String(id),
        String(userType)
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
}
