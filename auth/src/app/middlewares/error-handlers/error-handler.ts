import { Request, Response, NextFunction } from 'express';
import { CustomError } from './custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ ok:false, errors: err.serializeErrors() });
  }

  res.status(400).send({
    ok:false,
    errors: [{ message: 'Unhandled Server Error' }],
  });
};
