import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Db } from "mongodb";
import mongoose from "mongoose";


const auth = betterAuth({
    //@ts-ignore
    database: mongodbAdapter(mongoose.connection.db, { client: mongoose.connection.getClient() })
});

export default {
    auth
};