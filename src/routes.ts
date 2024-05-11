import express = require("express");
import UserController from "./controller/user-controller";
import { authentication } from "./middlewares/authentication";
import ProductController from "./controller/product-controller";
import OrderController from "./controller/order-controller";

const routes = express.Router();

routes.post("/users", UserController.register);
routes.post("/login", UserController.login);

routes.get("/users/profile", authentication, UserController.getUser);
routes.put("/users/profile", authentication, UserController.updateUser);

routes.get("/products", authentication, ProductController.getProducts);

routes.post("/orders", authentication, OrderController.createOrder);
routes.get("/orders", authentication, OrderController.getOrders);
routes.get("/orders:/id", authentication, OrderController.getOrder);

export default routes;
