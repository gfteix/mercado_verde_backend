import { AppDataSource } from "../database/database.config";
import { Product } from "../entities/product";
import { GetProductsPayload } from "../schemas/get-products-schema";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Buffer ? string : RecursivePartial<T[P]>;
};

type ProductWithBase64Image = RecursivePartial<Product>; // changing image from buffer to string in both Product and Category types

export class ProductService {
  static async getProducts(
    payload: GetProductsPayload,
  ): Promise<ProductWithBase64Image[]> {
    const productRepository = AppDataSource.getRepository(Product);

    let query = productRepository
      .createQueryBuilder("product")
      .innerJoinAndSelect("product.category", "category");

    if (payload.name) {
      query = query.andWhere("LOWER(product.name) like :name", {
        name: `%${payload.name.toLowerCase()}%`,
      });
    }
    if (payload.category) {
      query = query.andWhere("LOWER(category.name) = :categoryName", {
        categoryName: payload.category.toLowerCase(),
      });
    }

    const products = await query.getMany();

    return products.map((p) => ({
      ...p,
      image: p.image.toString("base64"),
      category: {
        ...p.category,
        image: p.category.image.toString("base64"),
      },
    }));
  }
}
