import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { TokenExpiredError } from "jsonwebtoken";
import { verify } from "../helpers/token";

export const accessTokenValidator = (req: Request, _: Response, next: NextFunction): void => {
    try {

        const token: string = req.headers.authorization?.replace("Bearer ", "") || "";

        if (!token) {
            throw new Error("NoToken");
        }

        const decoded: JwtPayload = verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.headers.authorization = `Bearer ${decoded.token}`;

        return next();

    } catch (e: Error | any) {

        if (e.name === "TokenExpiredError") {
            throw new TokenExpiredError("AccessToken expired", e.expiredAt);
        }

        throw e;
    }
}