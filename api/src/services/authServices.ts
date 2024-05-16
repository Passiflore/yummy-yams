import { Response } from "express";
import { IUser } from "../interfaces/user";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function encryptPassword(password: string) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

export const registerServices = async (res: Response, userPayload: IUser) => {
	try {
		await encryptPassword(userPayload.password).then((hashedPassword) => {
			userPayload.password = hashedPassword;
		});
		await User.create(userPayload);
		res.status(200).send({ message: "User created successfully" });
	} catch (error: any) {
		if (error.code === 11000) {
			return res
				.status(409)
				.send({ message: "Username or email already exists" });
		}
		return res.status(500).send({ message: "Internal Server Error" });
	}
};

export const loginServices = async (userPayload: IUser, res: Response) => {
	try {
		User.findOne({ email: userPayload.email }).then(async (user: any) => {
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			const validPassword = await bcrypt.compare(
				userPayload.password,
				user.password
			);
			if (!validPassword) {
				return res.status(401).send({ message: "Invalid Password" });
			}

			const jwtToken = jwt.sign(
				{
					username: userPayload.username,
					email: userPayload.email,
					nbOfGames: userPayload.nbOfGames,
					userId: user._id,
				},
				process.env.JWT_SECRET as string,
				{ expiresIn: "1h" }
			);

			return res.status(200).send({ token: jwtToken });
		});
	} catch (error: any) {
		console.log(error);
	}
};
