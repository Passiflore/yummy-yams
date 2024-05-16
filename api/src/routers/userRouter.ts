import express from "express";
import {
	handleLaunchGame,
	handleRollDice,
	handleUserInfo,
} from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

export const userRouter = express.Router();

userRouter.get("/me/:token", handleUserInfo);

userRouter.use(verifyToken);
userRouter.post("/launchGame", handleLaunchGame);

userRouter.post("/rollDice", handleRollDice);
