import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes"
import { last } from "lodash";
import { sensitiveFields } from "../types/SensitiveFields";

export const errorHandler = (err: Error | any, _: Request, res: Response, __: NextFunction): Response => {

    // Authentication errors
    if (err.message === "NoToken") {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: "auth.000", message: "No token provided" });
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: "auth.001", message: "Invalid token" });
    }

    if (err.name === "TokenExpiredError" && err.message === "AccessToken expired") {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: "auth.002", message: "Access token expired" });
    }

    if (err.name === "TokenExpiredError" && err.message === "RefreshToken expired") {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: "auth.003", message: "Refresh token expired" });
    }

    if (err.message === "UnverifiedToken") {
        return res.status(StatusCodes.UNAUTHORIZED).json({ code: "auth.004", message: "Unverified token" });
    }

    // Database errors
    if (Number(err.code) === 11000) {

        const keys: string[] = Object.keys(err.keyValue);

        let message: string = `The '${last(keys[0].split("."))}' already exists in the database`;

        if (keys.length > 2) {

            const fields: string[] = keys
                .filter(key => !sensitiveFields.includes(key))
                .filter(key => err.keyValue[key] !== null)
                .map(key => `'${key}'`);

            message = `A Record with ${fields.slice(0, -1).join(", ")}, and ${last(fields)} fields already exists in the database`;

        }

        return res.status(StatusCodes.CONFLICT).json({message});

    }

    console.log(err);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
}