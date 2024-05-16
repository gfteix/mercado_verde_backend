import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "category" })
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "image_url", nullable: true })
  imageUrl: string;
}
