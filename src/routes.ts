import express = require("express");
import UserController from "./controller/user-controller";
import { authentication } from "./middlewares/authentication";

const routes = express.Router();

routes.post("/users", UserController.register);
routes.post("/login", UserController.login);

routes.get("/users/profile", authentication, UserController.getUser);
routes.put("/users/profile", authentication, UserController.updateUser);

export default routes;
