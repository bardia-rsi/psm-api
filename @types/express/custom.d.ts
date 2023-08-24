import { PID } from "../../types/Data/Bases";

declare module "express-serve-static-core" {
    export interface Request {
        user: {
            pid: PID;
        }
    }
}

export {};