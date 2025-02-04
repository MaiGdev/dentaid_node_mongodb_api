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
}
