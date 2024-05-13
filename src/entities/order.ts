import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
import { OrderItem } from "./order-item";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  totalPrice: number;

  @Column()
  status: string;

  @Column({ name: "user_id " })
  userId: string;

  @JoinColumn({ name: "user_id " })
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => OrderItem, (OrderItem) => OrderItem.order, {
    cascade: true,
  })
  orderItems: OrderItem[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
