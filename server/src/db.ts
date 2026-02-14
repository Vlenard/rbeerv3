import mongoose from "mongoose";

const connect = (): Promise<number> => new Promise((resolve) => {
    mongoose.connect(process.env.MONGO_URI as string).then(() => {
        resolve(1);
    }).catch(() => {
        resolve(-1);
    });
});

export default {
    connect
}