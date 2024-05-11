/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { ErrorBase } from "../errors/error-base";

function errorHandler(
  error: ErrorBase,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("statusCode: " + error.statusCode);
  console.log("message: " + error.message);

  if (error instanceof ErrorBase) {
    return res.status(error.statusCode).send(error.message);
  }
  return res.status(500).send("Something went wrong");
}

export default errorHandler;
