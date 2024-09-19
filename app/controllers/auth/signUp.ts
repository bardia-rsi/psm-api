import type { Request, Response } from "express";
import type { UserData } from "../../../types/Data/User";
import type { AuthenticationResponse } from "../../../types/Response";
import { StatusCodes } from "http-status-codes";
import { create } from "../../models/User";
import { authenticate } from "../../../helpers/authenticate";

export const signUpHandler = async (req: Request, res: Response): Promise<Response<AuthenticationResponse>> => {

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

    return authenticate(req, res, user.pid, false);

}