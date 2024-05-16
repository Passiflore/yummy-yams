import { Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		nbOfGames: { type: Number, default: 3 },
		prizes: { type: [String], default: [] },
		alreadyPlayed: { type: Boolean, default: false },
		diceRolls: { type: [Number], default: [] },
		haveWon: { type: Boolean, default: false },
	},
	{
		collection: "users",
	}
);

export default userSchema;
