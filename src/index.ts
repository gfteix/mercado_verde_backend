import express = require("express");
import { AppDataSource } from "./database/database.config";
import * as dotenv from "dotenv";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";
import seed from "./database/seed";
import logger from "./middlewares/logger";
dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    await seed();
  })
  .catch((error) => {
    console.log(error);
    console.log("Error starting data source");
  });

const PORT = process.env.NODE_LOCAL_PORT ?? "6868";
const app = express();

app.use(express.json());
app.use(logger);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  next();
});

app.use("/api/v1", routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
