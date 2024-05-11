import { compare } from "bcrypt";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { LoginPayload } from "../schemas/login-schema";
import { InternalServerError } from "../errors/internal-error";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../db";
import { User } from "../entity/user";

export class AuthService {
  static async login(payload: LoginPayload): Promise<string> {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({
      where: { email: payload.email },
      select: ["id", "email", "password"],
    });

    if (!existingUser) {
      throw new UnauthorizedError();
    }

    const isPasswordValid = await compare(
      payload.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }

    return AuthService.generateToken(existingUser.id);
  }

  static generateToken(userId: string) {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET || !userId) {
      throw new InternalServerError("Internal Error");
    }

    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
  }
}
