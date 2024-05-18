/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { ErrorBase } from "../errors/error-base";

function errorHandler(
  error: ErrorBase,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ErrorBase) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  return res.status(500).send({ message: "Something went wrong" });
}

export default errorHandler;
