import { Response } from "express";
import { db } from "../database/database";
import { IUser } from "../interfaces/user";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function encryptPassword(password: string) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

export const registerServices = (res: Response, userPayload: IUser) => {
	db("users").then(async () => {
		try {
			await encryptPassword(userPayload.password).then((hashedPassword) => {
				userPayload.password = hashedPassword;
			});
			await User.create(userPayload);
			res.send("User created successfully");
		} catch (error: any) {
			if (error.code === 11000) {
				return res.status(409).send("Username already exists");
			}
			return res.status(500).send("Internal Server Error");
		}
	});
};

export const loginServices = async (userPayload: IUser, res: Response) => {
	db("users").then(async () => {
		try {
			User.findOne({ username: userPayload.username }).then(
				async (user: any) => {
					if (!user) {
						return res.status(404).send("User not found");
					}
					const validPassword = await bcrypt.compare(
						userPayload.password,
						user.password
					);
					if (!validPassword) {
						return res.status(401).send("Invalid Password");
					}

					const jwtToken = jwt.sign(
						{ username: userPayload.username },
						process.env.JWT_SECRET as string,
						{ expiresIn: "1h" }
					);

					return res.status(200).send({ token: jwtToken });
				}
			);
		} catch (error: any) {
			console.log(error);
		}
	});
};

// if(!user){
//     return "User not found"
// }
// const validPassword = await bcrypt.compare(userPayload.password, user.password)
// if(!validPassword){
//     return "Invalid Password"
// }
// return "Login Successful"
