import express = require("express");
import { AppDataSource } from "./db";
import * as dotenv from "dotenv";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.log(error);
    console.log("Error starting data source");
  });

const PORT = process.env.PORT ?? "6868";
const app = express();

app.use(express.json());

app.use("/api/v1", routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
