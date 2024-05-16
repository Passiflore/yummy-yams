import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	retrieveUserInfo,
	setUserAlreadyPlayed,
	setUserDiceRolls,
	setUserHaveWon,
	setUserNbOfGames,
} from "../services/userServices";
import { Types } from "mongoose";
import User from "../models/user";

interface DecodedToken {
	userId: string;
	iat: number;
	exp: number;
	email: string;
}

export const handleUserInfo = async (req: Request, res: Response) => {
	const token = req.params.token;
	try {
		console.log("Decoding token...");
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
		const { userId } = decodedToken as DecodedToken;
		try {
			const userData = await retrieveUserInfo(userId);
			return res.status(200).send(userData);
		} catch (err) {
			return res.status(404).send({ message: "User not found" });
		}
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).send({ message: "Token expired" });
			}
			return res.status(401).send({ message: "Invalid token" });
		}
	}
};

export const handleLaunchGame = async (req: Request, res: Response) => {
	console.log("Launching game...");

	const user = await retrieveUserInfo(req.body.userId);

	if (user.alreadyPlayed) {
		return res.status(401).send({ message: "User already played" });
	}

	setUserAlreadyPlayed(req.body.userId);
	return res.status(200).send({ message: "Game launched" });
};

function rollTheDice(dices: number[], lockedDices: boolean[]): number[] {
	const diceRolls = dices.map((dice, index) => {
		if (lockedDices[index]) {
			return dice;
		}
		return Math.floor(Math.random() * 6) + 1;
	});

	return diceRolls;
}

export function checkVictory(dices: number[]): boolean {
	console.log("Checking victory... with dices: [", dices, "]");
	const dicesCount = dices.reduce((acc, dice) => {
		acc[dice] = (acc[dice] || 0) + 1;
		return acc;
	}, {} as { [key: number]: number });

	const dicesCountValues = Object.values(dicesCount);

	console.log("Dices count: ", dicesCountValues);

	if (dicesCountValues.includes(5) || dicesCountValues.includes(4)) {
		console.log("User won with 4 or 5 identical dices");
		return true;
	}

	if (dicesCountValues.length === 2) {
		console.log("User won with a full house");
		return true;
	}

	const pairs = dicesCountValues.filter((value) => value === 2);
	if (pairs.length === 2) {
		console.log("User won with 2 pairs of dices");
		return true;
	}

	console.log(pairs);

	return false;
}

export const handleRollDice = async (req: Request, res: Response) => {
	const user = await retrieveUserInfo(req.body.userId);

	if (user.nbOfGames === 0) {
		console.log("User can not roll the dice anymore");
		return res.status(401).send({ message: "No more games left" });
	}
	console.log("User can roll the dice");

	try {
		setUserNbOfGames(req.body.userId);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: "Internal Server Error" });
	}

	if (user.diceRolls.length === 0)
		console.log("First dice roll of the user...");
	console.log("Rolling the dice...");
	const rolledDice =
		user.diceRolls.length === 0
			? rollTheDice([1, 2, 3, 4, 5], [false, false, false, false, false])
			: rollTheDice(user.diceRolls, req.body.lockedDices);
	console.log(
		"Rolled dice: [",
		rolledDice,
		"] saving this roll to the database..."
	);

	setUserDiceRolls(req.body.userId, rolledDice);

	if (checkVictory(rolledDice)) {
		console.log("User won the game!");
		setUserHaveWon(req.body.userId);
	}

	console.log("Dice rolled, sending response...");
	return res
		.status(200)
		.send({ message: "Dice rolled", rolledDice: rolledDice });
};
