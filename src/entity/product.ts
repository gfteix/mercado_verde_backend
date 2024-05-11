import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./category";

@Entity({ name: "Product" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("uuid", { name: "category_id", nullable: true })
  categoryId: string;

  @JoinColumn({ name: "category_id" })
  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @Column()
  price: number;

  @Column("bytea", { nullable: true })
  image: Buffer;

  @CreateDateColumn()
  createdAt: Date;
}
