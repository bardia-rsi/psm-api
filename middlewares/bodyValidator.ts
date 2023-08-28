import type { NextFunction, Request, Response } from "express";
import type { ValidationError } from "../helpers/validator";
import { StatusCodes } from "http-status-codes";
import { singular } from "pluralize"
import { camelCase } from "lodash";
import { validator } from "../helpers/validator";

export const bodyValidator = async (req: Request, res: Response, next: NextFunction): Promise<Response<ValidationError | void> | void> => {
    try {

        const filename: string = singular(camelCase(req.originalUrl.split("/")[2].toLowerCase()));
        const schemaName: string = req.method === "POST" ? "create" : req.method === "PUT" ? "update" : "";

        const { error, value } = await validator(filename, schemaName, req.body);

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