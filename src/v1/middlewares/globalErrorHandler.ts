import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../config/customError";

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR:", err);
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
};
