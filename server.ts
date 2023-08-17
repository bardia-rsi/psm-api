import type { Express } from "express";
import express from "express";
// Middlewares
import morgan from "morgan";

const app: Express = express();

let serverRunning: boolean = false;

const config = (): void => {

    // Middlewares
    app.use(morgan("dev"));

}

export const start = (): void => {

    if (serverRunning) {
        return;
    }

    config();

    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });

    serverRunning = true;

}

export default app;