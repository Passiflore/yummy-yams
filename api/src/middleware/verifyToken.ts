import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const JWT_SECRET = process.env.JWT_SECRET;

	// Check if the token is in the Authorization header and split it to retrieve the token without the Bearer keyword
	const token = req.headers.authorization?.split(" ")[1];

	console.log("Verifying token...");
	console.log(token);
	if (!token) {
		return res.status(401).send({ message: "No token provided" });
	}
	try {
		if (!JWT_SECRET) {
			throw new Error("No JWT_SECRET found in .env file");
		}
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

		req.body.userId = (decodedToken as any).userId;
		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).send({ message: "Token expired" });
			}
			return res.status(401).send({ message: "Invalid token" });
		}
	}
};
