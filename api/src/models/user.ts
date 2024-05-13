import { model } from "mongoose";
import { IUser } from "../interfaces/user";
import userSchema from "../schemas/user";


const User = model<IUser>("User", userSchema)

export default User;
