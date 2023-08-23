import type { Request, Response } from "express";
import type { UserData, UserJsonData } from "../../../types/Data/User";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";
import { create } from "../../models/User";
import { createRefreshToken, createAccessToken, storeRefreshToken } from "../../../helpers/token";

export const signUpHandler = async (req: Request, res: Response): Promise<Response<UserJsonData | void>> => {

    // Check the useragent
    if (!req.useragent) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "the useragent is empty."
        });
    }

    const user: UserData | undefined = await create(req.body);

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const refreshToken: string = createRefreshToken(user.pid, req.useragent.os);
    const accessToken: string = createAccessToken(refreshToken);

    // Add the refresh token to the redis cache
    if (!(await storeRefreshToken(user.pid, refreshToken))) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    return res.status(StatusCodes.CREATED).json({
        ...omit(user, ["login.password", "login.securityQuestions"]),
        refreshToken,
        accessToken
    });

}