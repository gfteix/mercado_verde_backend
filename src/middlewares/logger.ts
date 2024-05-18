import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  const method = req.method;
  const url = req.url;

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const statusCode = res.statusCode;

    console.log(
      `${new Date(startTime).toISOString()} ${method} ${url} - StatusCode: ${statusCode} - Duration: ${duration}ms`,
    );
  });

  next();
};

export default logger;
