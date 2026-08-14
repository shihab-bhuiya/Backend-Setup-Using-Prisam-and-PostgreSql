// import { Request, Response, NextFunction } from "express";
import type { NextFunction, Request, Response } from "express";
import AppError from "../lib/AppError.js";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;