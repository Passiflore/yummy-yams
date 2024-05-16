import { ObjectId, Types } from "mongoose";
import User from "../models/user";

interface UserData {
	nbOfGames: number;
	prizes: string[];
	id: Types.ObjectId;
	username: string;
	alreadyPlayed: boolean;
	diceRolls: number[];
	haveWon: boolean;
}

export const retrieveUserInfo = async (userId: string): Promise<UserData> => {
	try {
		console.log("Fetching User Data from token: User ID: ", userId);
		return User.findById(userId).then((user) => {
			if (!user) {
				throw new Error("User not found");
			}

			return {
				nbOfGames: user.nbOfGames,
				prizes: user.prizes,
				id: user._id,
				username: user.username,
				alreadyPlayed: user.alreadyPlayed,
				diceRolls: user.diceRolls,
				haveWon: user.haveWon,
			};
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const setUserAlreadyPlayed = async (userId: string): Promise<void> => {
	try {
		console.log(`Setting ${userId} alreadyPlayed to true`);
		await User.findOneAndUpdate({ _id: userId }, { alreadyPlayed: true });
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const setUserNbOfGames = async (userId: string): Promise<void> => {
	try {
		console.log(`Setting ${userId} nbOfGames to nbOfGames - 1`);
		await User.findOneAndUpdate({ _id: userId }, { $inc: { nbOfGames: -1 } });
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const setUserDiceRolls = async (
	userId: string,
	diceRolls: number[]
): Promise<void> => {
	try {
		console.log(`Setting ${userId} diceRolls to ${diceRolls}`);
		await User.findOneAndUpdate({ _id: userId }, { diceRolls: diceRolls });
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const setUserHaveWon = async (userId: string): Promise<void> => {
	try {
		console.log(`Setting ${userId} haveWon to true`);
		await User.findOneAndUpdate({ _id: userId }, { haveWon: true });
	} catch (error: any) {
		throw new Error(error.message);
	}
};
