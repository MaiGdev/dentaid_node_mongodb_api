import { Request, Response } from "express";
import { UpdateUserDto } from "../../domain/dtos";
import { handleCustomError } from "../helpers";
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
      const users = await this.userService
        .getUsersByUserType(String(userType))
        .then((users) => res.status(200).json(users))
        .catch((err) =>
          res.status(404).json({ message: "Users could not be found" })
        );

      return users;
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
      const user = await this.userService
        .getUserByUserTypeId(String(id), String(userType))
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => handleCustomError(err, res));

      return user;
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.query;
    const [error, updateUserDto] = UpdateUserDto.register(req.body);

    if (!id) return res.status(404).json({ error: "ID not provided" });
    if (error) return res.status(400).json({ error });

    this.userService
      .updateUser(String(id), updateUserDto!)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        handleCustomError(err, res);
      });
  };
}
