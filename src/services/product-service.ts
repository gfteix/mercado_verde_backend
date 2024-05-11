import { AppDataSource } from "../db";
import { Product } from "../entity/product";
import { GetProductsPayload } from "../schemas/get-products-schema";

export class ProductService {
  static getProducts(payload: GetProductsPayload): Promise<Product[]> {
    const productRepository = AppDataSource.getRepository(Product);

    let query = productRepository.createQueryBuilder("product");

    if (payload.name) {
      query = query.where("product.name like :name", {
        name: `%${payload.name}%`,
      });
    }
    if (payload.category) {
      query = query
        .innerJoin("product.category", "category")
        .where("category.name = :categoryName", {
          categoryName: payload.category,
        });
    }

    return query.getMany();
  }
}
