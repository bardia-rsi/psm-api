import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createAccessToken } from "../../../helpers/token";

export const tokenHandler = (req: Request, res: Response): Response<{ accessToken: string } | void> => {

    if (!req.headers.authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    return res.status(StatusCodes.CREATED).json({
        accessToken: createAccessToken(req.headers.authorization)
    });

}