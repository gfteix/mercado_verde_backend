import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request.error";
import { GetProductsPayload } from "../schemas/get-products-schema";
import { ProductService } from "../services/product-service";

class ProductController {
  static async getProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req["claims"]["userId"];
      const queryParams = req.query as GetProductsPayload;

      if (!userId) {
        throw new BadRequestError("No user id");
      }

      const products = await ProductService.getProducts(queryParams);

      res.json({ products });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
