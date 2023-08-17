import * as mongoose from "mongoose";
// Plugins
import updatedAt from "./plugins/updatedAt";
import transformer from "./plugins/transformer";

let isConnected: boolean = false;

// Plugins
mongoose.plugin(updatedAt);
mongoose.plugin(transformer);

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
