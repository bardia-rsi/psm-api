import type { Express } from "express";
import type { Handler } from "vhost";
import express from "express";
import "express-async-errors";
// Middlewares
import cors from "cors";
import morgan from "morgan";
import useragent from "express-useragent";
import vhost from "vhost";
import { errorHandler } from "./middlewares/errorHandler";
// Routes
import authRoute from "./app/routes/auth";
import apiRoute from "./app/routes/api";
import mediaRoute from "./app/routes/media";

const app: Express = express();

let serverRunning: boolean = false;

const config = (): void => {

    // Middlewares
    app.use(cors());
    app.use(morgan(process.env.LOG_FORMAT));
    app.use(useragent.express());

    // Routes
    app.use(vhost(`auth.${process.env.DOMAIN_NAME}`, authRoute as unknown as Handler));
    app.use(vhost(`api.${process.env.DOMAIN_NAME}`, apiRoute as unknown as Handler));
    app.use(vhost(`media.${process.env.DOMAIN_NAME}`, mediaRoute as unknown as Handler));

    // Error Handlers
    app.use(errorHandler);

}

export const start = (): void => {

    if (serverRunning) {
        return;
    }

    config();

    app.listen(Number(process.env.HOST_PORT), process.env.HOST_URL, () => {
        console.log(`Server started on ${process.env.HOST_URL}:${process.env.HOST_PORT}`);
    });

    serverRunning = true;

}

export default app;