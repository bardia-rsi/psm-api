import dotenv from "dotenv";
import { connect } from "./database";
import { start } from "./server";

// Load environment variables from .env file into process.env
dotenv.config();

start();
connect().then(() => {
    start();
});