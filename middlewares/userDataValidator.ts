import type { Request, Response, NextFunction } from "express";
import type { ValidationError } from "../helpers/validator";
import { StatusCodes } from "http-status-codes";
import { validator } from "../helpers/validator";

export const userDataValidator = async (req: Request, res: Response, next: NextFunction): Promise<Response<ValidationError | void> | void> => {
    try {

        let schemaName: string = "";

        if (req.hostname.split(".")[0] === "auth") {

            if (req.originalUrl.split("/")[1] === "sign-up") {
                schemaName = "signUp";
            } else if (req.originalUrl.split("/")[1] === "login") {
                schemaName = "login";
            }

        }

        const { error, value } = await validator("user", schemaName, req.body);

        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error);
        }

        req.body = value;

        return next();

    } catch (e: Error | any) {

        if (e.code === "MODULE_NOT_FOUND" || e.message === "SchemaNotFound") {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
        }

        throw e;

    }
}