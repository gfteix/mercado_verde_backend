import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
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

  @Column({ name: "image_url", nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
