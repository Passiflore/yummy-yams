import mongoose, { model } from "mongoose";
import { IUser } from "../interfaces/user";
import userSchema from "../schemas/user";

const User = mongoose.connection
	.useDb("users")
	.model<IUser>("User", userSchema);

export default User;
