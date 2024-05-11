import { AppDataSource } from "../db";
import { User } from "../entity/user";
import { RegisterPayload } from "../schemas/register-schema";
import { ConflictError } from "../errors/conflict-error";
import { isUUID } from "class-validator";
import { NotFoundError } from "../errors/not-found-error";
import { UpdateProfilePayload } from "../schemas/update-schema";
import { hash } from "bcrypt";
import { AuthService } from "./auth-service";

class UserService {
  static async register(
    payload: RegisterPayload,
  ): Promise<{ user: User; token: string }> {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({
      email: payload.email,
    });

    if (existingUser) {
      throw new ConflictError("A user with this email already exists");
    }

    payload.password = await hash(payload.password, 10);

    const newUser = {
      ...new User(),
      ...payload,
    };

    const createdUser = await userRepository.save(newUser);
    const token = AuthService.generateToken(createdUser.id);

    return { user: createdUser, token };
  }

  static async update(
    id: string,
    payload: UpdateProfilePayload,
  ): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const updatedUser = userRepository.merge(user, {
      ...new User(),
      ...payload,
    });

    const results = await userRepository.save(updatedUser);
    return results;
  }

  static async getById(id: string): Promise<User> {
    if (!isUUID(id)) {
      throw new NotFoundError("User not found");
    }
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.findOne({ where: { id } });
  }
}

export default UserService;
