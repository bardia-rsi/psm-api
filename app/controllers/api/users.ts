import type { Request, Response } from "express";
import type { UserData, UserJsonData } from "../../../types/Data/User";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";
import { update as modelUpdateMethod, remove as modelRemoveMethod, findOne } from "../../models/User";
import { updateHandler, getHandler } from "../../../helpers/responseHandler";
import { logoutHandler } from "../auth/logout";

export const get = async (req: Request, res: Response): Promise<Response<UserJsonData>> => {
    return getHandler<UserJsonData>(res, async (): Promise<UserJsonData | null> => {
        return findOne({ pid: req.user.pid });
    });
}

export const update = async (req: Request, res: Response): Promise<Response<UserJsonData>> => {
    return updateHandler<UserJsonData>(res, async (): Promise<UserJsonData | null> => {

        const doc: UserData | null = await modelUpdateMethod(req.user.pid, req.body);

        if (!doc) {
            return null;
        }

        return omit(doc, ["login.password", "login.securityQuestions"]) as UserJsonData;

    });
}

export const remove = async (req: Request, res: Response): Promise<Response<void>> => {

    const result: boolean = await modelRemoveMethod(req.user.pid);

    if (result) {
        return await logoutHandler(req, res);
    }

    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();

}