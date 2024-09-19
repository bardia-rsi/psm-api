import type { Request, Response } from "express";
import type { UserData } from "../../../types/Data/User";
import type { AuthenticationResponse } from "../../../types/Response";
import { StatusCodes } from "http-status-codes";
import { compare } from "bcrypt";
import { omit, findKey } from "lodash";
import { findOne } from "../../models/User";
import { authenticate } from "../../../helpers/authenticate";

export const loginHandler = async (req: Request, res: Response): Promise<Response<AuthenticationResponse>> => {

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

    return authenticate(req, res, user.pid, true);

}