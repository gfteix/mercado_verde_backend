import { ErrorBase } from "./error-base";

export class UnauthorizedError extends ErrorBase {
  statusCode = 401;
  message: string;

  constructor(message = "Unauthorized") {
    super(message);
    this.message = message;
  }
}
