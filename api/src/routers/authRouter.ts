import express, { Express } from "express";
import { handleLogin, handleRegister } from "../controllers/authController";
import { body } from "express-validator";

export const authRouter = express.Router();

authRouter.post(
	"/login",
	body("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
	body("password")
		.isLength({ min: 12 })
		.withMessage("Password must be at least 12 characters"),
	handleLogin
);

authRouter.post(
	"/register",
	body("username").isLength({ min: 4 }).withMessage("Invalid Username"),
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.normalizeEmail()
		.withMessage("Invalid Email"),
	body("password")
		.isLength({ min: 12 })
		.withMessage("Password must be at least 12 characters"),
	handleRegister
);
