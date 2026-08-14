// import { Request, Response, NextFunction } from "express";
import type { NextFunction, Request, Response } from "express";
import type { ZodSchema, ZodType, ZodTypeDef } from "zod/v3";
// import { ZodSchema } from "zod";

const validate = (schema: ZodType<any, ZodTypeDef, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;

    next();
  };
};

export default validate;