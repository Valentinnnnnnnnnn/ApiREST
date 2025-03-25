import { NextFunction, Request, Response } from 'express';
import { CustomError } from './error.model';

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ error: err.errorName, message: err.message });
  } else {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
  }
};
