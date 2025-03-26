import { Request, Response } from 'express'
import { AppError } from './error.model'

export const errorHandlerMiddleware = (
  error: Error | AppError,
  req: Request,
  res: Response,
): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  // Manage unexpected errors
  return res.status(500).json({
    status: 'error',
    message:
      'An unexpected error occurred, please try again later or contact your system administrator'
  })
}
