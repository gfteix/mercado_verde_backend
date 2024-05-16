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

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column("uuid", { name: "category_id", nullable: true })
  categoryId: string;

  @JoinColumn({ name: "category_id" })
  @ManyToOne(() => Category, (category) => category.id, {
    cascade: ["insert", "update"],
  })
  category: Category;

  @Column()
  price: number;

  @Column({ name: "image_url", nullable: true })
  imageUrl: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
