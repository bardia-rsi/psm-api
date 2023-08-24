import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { removeCachedRefreshToken } from "../../../helpers/token";

export const logoutHandler = async (req: Request, res: Response): Promise<Response<void>> => {

    if (!req.headers.authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    const result: null | boolean = await removeCachedRefreshToken(req.user.pid, req.headers.authorization);

    if (result === null) {
        return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    if (!result) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    return res.status(StatusCodes.NO_CONTENT).end();

}