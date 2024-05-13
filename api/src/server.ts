import express, { Express } from "express";
import dotenv from "dotenv";
import { authRouter } from "./routers/authRouter";
import cors from "cors";

const app: Express = express();
app.use(cors({ origin: "*" }));

dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());

app.use(authRouter);

// Path: api/server.ts
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
	console.log(process.env.JWT_SECRET);
});
