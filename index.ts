import dotenv from "dotenv";
import { start } from "./server";

// Load environment variables from .env file into process.env
dotenv.config();

start();