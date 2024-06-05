import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request.error";
import { CategoryService } from "../services/category-service";

class CategoryController {
  static async getCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req["claims"];

      if (!userId) {
        throw new BadRequestError("No user id");
      }

      const categories = await CategoryService.getCategories();

      res.json({ categories });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
