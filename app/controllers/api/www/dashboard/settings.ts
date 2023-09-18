import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dashboardSettings from "../../../../../data/www/dashboard/settings.json";
import plans from "../../../../../data/www/website/plans.json";
import entityForms from "../../../../../data/www/dashboard/forms.json";

export const get = (_: Request, res: Response): Response<JSON> => {
    try {
        return res.status(StatusCodes.OK).json({ ...dashboardSettings, plans: plans, entityForms: entityForms });
    } catch (e) {
        throw e;
    }
}