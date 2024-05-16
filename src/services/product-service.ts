import { AppDataSource } from "../database/database.config";
import { Product } from "../entities/product";
import { GetProductsPayload } from "../schemas/get-products-schema";

export class ProductService {
  static getProducts(payload: GetProductsPayload): Promise<Product[]> {
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

    return query.getMany();
  }
}
