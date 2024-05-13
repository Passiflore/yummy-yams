import mongoose from "mongoose"
import { Schema } from "mongoose"

const MONGO_URI : string | undefined= process.env.MONGO_URI 

export const db = async (dbName : string) => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined")
        }
        await mongoose.connect(MONGO_URI + dbName, {authSource: "admin"})
    }
    catch (error) {
        console.log(error)
    }
}