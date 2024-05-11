import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Product } from "./product";
import { Order } from "./order";

@Entity({ name: "orderitem" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "product_id", nullable: true })
  productId: string;

  @JoinColumn({ name: "product_id" })
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column()
  quantity: number;

  @Column("uuid", { name: "order_id", nullable: true })
  orderId: string;

  @JoinColumn({ name: "order_id" })
  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
