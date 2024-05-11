import { ErrorBase } from "./error-base";

export class BadRequestError extends ErrorBase {
  statusCode = 400;
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
