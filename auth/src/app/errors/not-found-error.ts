import { CustomError } from '../middlewares/error-handlers/custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not Found');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}
