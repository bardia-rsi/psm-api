import type { Response, Request } from "express";
import type { PID } from "../types/Data/Bases";
import type { AuthenticationResponse } from "../types/Response";
import { StatusCodes } from "http-status-codes";
import { createAccessToken, createRefreshToken, storeRefreshToken } from "./token";

const authenticate = async (
    req: Request, res: Response, userPid: PID, login: boolean
): Promise<Response<AuthenticationResponse>> => {

    const refreshToken: string = createRefreshToken(userPid, req.useragent!.os);
    const accessToken: string = createAccessToken(refreshToken);

    if (!(await storeRefreshToken(userPid, refreshToken))) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    res.cookie(
        "psm_refresh_token",
        refreshToken,
        {
            expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRATION_PERIOD) * 1000),
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
            domain: process.env.NODE_ENV === "production" ? `.${process.env.DOMAIN_NAME}` : undefined,
        }
    );

    return res.status(login ? StatusCodes.OK : StatusCodes.CREATED).json({ accessToken });

}

export { authenticate };