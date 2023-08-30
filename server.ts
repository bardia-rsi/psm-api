import type { Express } from "express";
import type { Handler } from "vhost";
import express from "express";
// Middlewares
import morgan from "morgan";
import useragent from "express-useragent";
import vhost from "vhost";
// Routes
import authRoute from "./app/routes/auth";
import apiRoute from "./app/routes/api";
import mediaRoute from "./app/routes/media";

const app: Express = express();

let serverRunning: boolean = false;

const config = (): void => {

    // Middlewares
    app.use(morgan("dev"));
    app.use(useragent.express());

    // Routes
    app.use(vhost("auth.localhost", authRoute as unknown as Handler));
    app.use(vhost("api.localhost", apiRoute as unknown as Handler));
    app.use(vhost("media.localhost", mediaRoute as unknown as Handler));

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