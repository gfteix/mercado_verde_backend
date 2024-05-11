import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { UnauthorizedError } from "../errors/unauthorized-error";
dotenv.config();

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError();
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError();
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    throw new UnauthorizedError();
  }

  req["claims"] = decode;
  next();
};
