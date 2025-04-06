import { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/errors'

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
    return
  }

  // Manage unexpected errors
  res.status(500).json({
    status: 'error',
    message:
      'An unexpected error occurred, please try again later or contact your system administrator'
  })
  return
}
