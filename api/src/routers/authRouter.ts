import express, {Express} from "express";
import { handleLogin, handleRegister } from "../controllers/authController";
import {body} from "express-validator"

export const authRouter = express.Router()

authRouter.post("/login",
body("username")
.isEmail()
.normalizeEmail()
.withMessage("Invalid Email"),
body("password")
.isLength({min: 12})
.withMessage("Password must be at least 12 characters"), 
handleLogin
)

authRouter.post("/register", 
body("username")
.isEmail()
.normalizeEmail()
.withMessage("Invalid Email"),
body("password")
.isLength({min: 12})
.withMessage("Password must be at least 12 characters"),
handleRegister
)