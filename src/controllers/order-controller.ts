import { Request, Response, NextFunction } from "express";
import {
  CreateOrderPayload,
  CreateOrderSchema,
} from "../schemas/create-order-schema";
import { BadRequestError } from "../errors/bad-request.error";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { OrderService } from "../services/order-service";

class OrderController {
  static async createOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const payload = req.body as CreateOrderPayload;
      const { userId } = req["claims"];

      if (!userId) {
        throw new UnauthorizedError();
      }

      const result = CreateOrderSchema.safeParse(payload);

      if (!result.success) {
        throw new BadRequestError(JSON.stringify(result.error));
      }

      const order = await OrderService.create(userId, payload);

      res.json({ id: order.id, status: order.status, total: order.totalPrice });
    } catch (error) {
      next(error);
    }
  }

  static getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req["claims"];

      if (!userId) {
        throw new UnauthorizedError();
      }

      const orders = OrderService.getOrders(userId);

      res.json({ orders });
    } catch (error) {
      next(error);
    }
  }

  static getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req["claims"];

      if (!userId) {
        throw new UnauthorizedError();
      }

      const { id } = req.params;

      const orders = OrderService.getOrder(id);

      res.json({ orders });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
