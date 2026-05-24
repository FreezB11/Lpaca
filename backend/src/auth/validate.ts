import { Request, Response, NextFunction } from "express";
import { z } from "zod";
 
export const signupSchema = z.object({
  email: z
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
 
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(72, "Password must be under 72 characters"),
});
 
export const loginSchema = z.object({
  email: z
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
 
  password: z
    .string()
    .min(1, "Password is required"),
});
 
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput  = z.infer<typeof loginSchema>;
 
// z.ZodType replaces the deprecated ZodSchema
export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
 
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      res.status(400).json({ message: "Validation failed", errors: fieldErrors });
      return;
    }
 
    req.body = result.data;
    next();
  };
}
 