import { ErrorBase } from "./error-base";

export class ConflictError extends ErrorBase {
  statusCode = 409;
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
