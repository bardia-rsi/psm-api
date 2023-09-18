import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { camelCase } from "lodash";

export const get = async (req: Request, res: Response): Promise<Response<JSON>> => {
    try {

        const page: string = req.params.page;
        const data = (await import("../../../../../data/www/website/pages/" + camelCase(page) + ".json")).default;

        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).end();
        }

        if (page === "home" || page === "pricing") {
            data.plans.slides = (await import("../../../../../data/www/website/plans.json")).default;
        }

        return res.status(StatusCodes.OK).json(data);

    } catch (e: any) {

        if (e.code === "MODULE_NOT_FOUND") {
            return res.status(StatusCodes.NOT_FOUND).end();
        }

        throw e;

    }
}