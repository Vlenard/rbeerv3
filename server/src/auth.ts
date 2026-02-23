import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

const auth = betterAuth({
    //@ts-ignore
    database: mongodbAdapter(mongoose.connection.db, { client: mongoose.connection.getClient() }),
    emailAndPassword: {
        enabled: true
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
    },

    trustedOrigins: [`http://localhost:${port}`, "http://localhost:4200"]
});

export default {
    auth
};