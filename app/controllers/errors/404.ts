import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const err404Handler = (_: Request, res: Response): Response<void> => {
    return res.status(StatusCodes.NOT_FOUND).end();
}