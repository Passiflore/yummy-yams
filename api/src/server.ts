import express, { Express } from "express";
import dotenv from "dotenv";
import { authRouter } from "./routers/authRouter";
import cors from "cors";
import { userRouter } from "./routers/userRouter";
import mongoose from "mongoose";
import { checkVictory } from "./controllers/userController";

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || "";
const PORT: string | number = process.env.PORT || 3000;

const app: Express = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(authRouter);
app.use(userRouter);

app.get("/", (req, res) => {
	res.send("Hello World");
});

try {
	mongoose.connect(MONGO_URI, { authSource: "admin" });
} catch (error) {
	console.log(error);
	throw new Error("Database connection failed");
}

app.listen(PORT, () => {
	console.log("Server is running on port 3000");
	console.log(process.env.JWT_SECRET);
});
