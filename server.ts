import type { Express } from "express";
import express from "express";
// Middlewares
import morgan from "morgan";
import useragent from "express-useragent";

const app: Express = express();

let serverRunning: boolean = false;

const config = (): void => {

    // Middlewares
    app.use(morgan("dev"));
    app.use(useragent.express());

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