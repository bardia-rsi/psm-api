import type { Request, Response } from "express";
import type { UserData } from "../../../types/Data/User";
import { StatusCodes } from "http-status-codes";
import { compare } from "bcrypt";
import { findOne } from "../../models/User";

interface Body {
    password: string;
}

export const checkPassword = async (req: Request<{}, {}, Body>, res: Response): Promise<Response<boolean>> => {

    if (!req.body?.password) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const user: UserData | null = await findOne({ pid: req.user.pid });

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const compareRes = await compare(req.body.password, user.login.password.current.content);

    return res.status(StatusCodes.OK).json(compareRes);

}