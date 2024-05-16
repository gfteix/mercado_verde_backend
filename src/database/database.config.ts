import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";

import * as dotenv from "dotenv";
import { Category } from "../entities/category";
import { Product } from "../entities/product";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order-item";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_LOCAL_PORT ?? "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Category, Product, Order, OrderItem],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
