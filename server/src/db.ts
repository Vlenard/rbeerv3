/// <reference types="node" />

import mongoose from "mongoose";

const db = (): Promise<void> =>
    new Promise((resolve) => {
        mongoose
            .connect(process.env.MONGO_URI as string, {
                dbName: process.env.MONGO_DB_NAME || "rbeerv3",
            } as mongoose.ConnectOptions)
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.error("Failed to connect to DB:", error);
                process.exit(1);
            });
    });

export default db;
