import  { Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new Schema<IUser>(
    {
        username: {type: String, required: true, unique: true}, 
        password: {type: String, required: true}
    },
    {
        collection: "users"
    }
)

export default userSchema;