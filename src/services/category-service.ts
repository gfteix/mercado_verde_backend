import { AppDataSource } from "../database/database.config";
import { Category } from "../entities/category";

type CategoryWithBase64Image = Omit<Category, "image"> & {
  image: string;
};

export class CategoryService {
  static async getCategories(): Promise<CategoryWithBase64Image[]> {
    const repository = AppDataSource.getRepository(Category);

    const categories = await repository.find();
    return categories.map((c) => ({
      ...c,
      image: c.image.toString("base64"),
    }));
  }
}
