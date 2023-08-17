import * as mongoose from "mongoose";

let isConnected: boolean = false;

export const connect = async (): Promise<void> => {
    if (isConnected) {
        return;
    }

    try {

        await mongoose.connect(process.env.MONGO_URL);

        console.log("Database connected successfully");

        isConnected = true;

    } catch (e) {
        console.log("Unable to connect to the database:", e);
    }
}