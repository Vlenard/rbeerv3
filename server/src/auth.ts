import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

const init = async () => {
    await mongoose.connect(process.env.MONGO_URI as string)

    const client = mongoose.connection.getClient()
    const db = client.db("rbeer")

    return betterAuth({
        database: mongodbAdapter(db, { client }),
        emailAndPassword: {
            enabled: true
        },
        session: {
            expiresIn: 60 * 60 * 24 * 7,
        },
        trustedOrigins: [`http://localhost:${3000}`, "http://localhost:4200"]
    })
};

export default {
    init
}