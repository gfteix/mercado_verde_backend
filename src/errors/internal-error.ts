import { ErrorBase } from "./error-base";

export class InternalServerError extends ErrorBase {
  statusCode = 500;
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
