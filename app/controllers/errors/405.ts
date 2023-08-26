import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const err405Handler = (_: Request, res: Response): Response<void> => {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
}