import { Router, Request, Response } from "express";
import { validate, signupSchema, loginSchema, SignupInput, LoginInput } from "./validate"
import { User } from "../models/UserSchema";
import bcrypt from "bcryptjs";

export const AuthRouter = Router();
/* 
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
POST   /api/v1/auth/verify
POST   /api/v1/auth/reset-password
*/

AuthRouter.post("/signup", validate(signupSchema), async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body as SignupInput;
        const exists = await User.findOne({email}); //todo
        if (exists) {
            res.status(409).json({ message: "An account with this email already exists" });
            return;
        }

        const hash = await bcrypt.hash(password,12);
        const user = await User.create({email, password:hash});
    }catch (error){
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})