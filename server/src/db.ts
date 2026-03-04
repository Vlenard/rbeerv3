import mongoose from "mongoose";

const connect = (): Promise<void> =>
    new Promise((resolve) => {
        mongoose
            .connect(process.env.MONGO_URI as string)
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.error("Failed to connect to DB:", error);
                process.exit(1);
            });
    });

export default {
    connect,
};
