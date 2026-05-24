import {Request, Response, NextFunction} from "express";
import {z} from "zod";

export const projectSchema = z.object({
    userID: z.string().length(32),
    projectID: z.string().length(16),
})

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