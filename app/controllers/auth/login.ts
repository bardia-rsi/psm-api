import type { Request, Response } from "express";
import type { UserData, UserJsonData } from "../../../types/Data/User";
import { StatusCodes } from "http-status-codes";
import { compare } from "bcrypt";
import { omit, findKey } from "lodash";
import { findOne } from "../../models/User";
import { createRefreshToken, createAccessToken, storeRefreshToken } from "../../../helpers/token";

export const loginHandler = async (req: Request, res: Response): Promise<Response<UserJsonData | void>> => {

    // Check the useragent
    if (!req.useragent) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "the useragent is empty."
        });
    }

    const user: UserData | null = await findOne({
        $or: [
            { "login.email": req.body.email },
            { "login.username": req.body.username },
            { "login.phoneNumber": req.body.phoneNumber }
        ]
    });

    const field = findKey(omit(req.body, "password"), value => value !== undefined);

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: `The ${field} or password is incorrect.`
        });
    }

    if (!(await compare(req.body.password, user.login.password.current.content))) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: `The ${field} or password is incorrect.`
        });
    }

    const refreshToken: string = createRefreshToken(user.pid, req.useragent.os);
    const accessToken: string = createAccessToken(refreshToken);

    if (!(await storeRefreshToken(user.pid, refreshToken))) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    return res.status(StatusCodes.OK).json({
        ...omit(user, ["login.password", "login.securityQuestions"]),
        refreshToken,
        accessToken
    });

}