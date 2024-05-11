import { NextFunction, Request, Response } from "express";
import { RegisterPayload, RegisterSchema } from "../schemas/register-schema";
import UserService from "../services/user-service";
import { BadRequestError } from "../errors/bad-request.error";
import {
  UpdateProfilePayload,
  UpdateProfileSchema,
} from "../schemas/update-schema";
import { LoginPayload, LoginSchema } from "../schemas/login-schema";
import { AuthService } from "../services/auth-service";

class UserController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const payload = req.body as RegisterPayload;

      const result = RegisterSchema.safeParse(payload);

      if (!result.success) {
        throw new BadRequestError(JSON.stringify(result.error));
      }

      const { token, user } = await UserService.register(payload);

      res.header("Authorization", token);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const payload = req.body as LoginPayload;

      const result = LoginSchema.safeParse(payload);

      if (!result.success) {
        throw new BadRequestError(JSON.stringify(result.error));
      }

      const accessToken = await AuthService.login(payload);

      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req["claims"];

      if (!userId) {
        throw new BadRequestError("No user id");
      }

      const payload = req.body as UpdateProfilePayload;
      const result = UpdateProfileSchema.safeParse(payload);

      if (!result.success) {
        throw new BadRequestError(JSON.stringify(result.error));
      }

      const user = await UserService.update(userId, payload);

      res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req["claims"];

      if (!userId) {
        throw new BadRequestError("No user id");
      }

      const user = await UserService.getById(userId);

      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
