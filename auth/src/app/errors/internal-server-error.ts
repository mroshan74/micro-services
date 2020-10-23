import { CustomError } from '../middlewares/error-handlers/custom-error';

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
