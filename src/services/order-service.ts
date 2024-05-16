import { In } from "typeorm";
import { AppDataSource } from "../database/database.config";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order-item";
import { Product } from "../entities/product";
import { CreateOrderPayload } from "../schemas/create-order-schema";

export class OrderService {
  static async create(
    userId: string,
    payload: CreateOrderPayload,
  ): Promise<Order> {
    const orderRepository = AppDataSource.getRepository(Order);
    const productRepository = AppDataSource.getRepository(Product);

    const order = new Order();

    const productToQuantity = new Map<string, number>();

    order.orderItems = payload.items.map((item) => {
      const orderItem = new OrderItem();

      productToQuantity.set(item.productId, item.quantity);

      orderItem.productId = item.productId;
      orderItem.quantity = item.quantity;

      return orderItem;
    });

    const productIds = Array.from(productToQuantity.keys());

    const products = await productRepository.find({
      where: { id: In(productIds) },
    });

    order.totalPrice = products.reduce((total, product) => {
      const current = product.price * productToQuantity.get(product.id);

      return total + current;
    }, 0);

    order.status = "NEW";
    order.userId = userId;

    return orderRepository.save(order);
  }

  static getOrders(userId: string): Promise<Order[]> {
    const orderRepository = AppDataSource.getRepository(Order);

    return orderRepository.find({ where: { userId } });
  }

  static getOrder(orderId: string): Promise<Order> {
    const orderRepository = AppDataSource.getRepository(Order);

    return orderRepository.findOneBy({ id: orderId });
  }
}
