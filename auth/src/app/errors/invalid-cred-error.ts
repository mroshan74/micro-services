import { CustomError } from '../middlewares/error-handlers/custom-error';

export class InvalidCredentialError extends CustomError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, InvalidCredentialError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
