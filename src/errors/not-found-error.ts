import { ErrorBase } from "./error-base";

export class NotFoundError extends ErrorBase {
  statusCode = 404;
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
