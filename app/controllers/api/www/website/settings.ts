import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import websiteSettings from "../../../../../data/www/website/settings.json";

export const get = (_: Request, res: Response): Response<JSON> => {
    try {
        return res.status(StatusCodes.OK).json(websiteSettings);
    } catch (e) {
        throw e;
    }
}