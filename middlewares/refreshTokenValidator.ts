import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import type { UserRefreshTokens } from "../types/UserRefreshTokens";
import { verifyRefreshToken, getRefreshTokens } from "../helpers/token";

export const refreshTokenValidator = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    try {

        const token: string = req.headers.authorization?.replace("Bearer ", "") || "";

        if (!token) {
            throw new Error("NoToken");
        }

        const decoded: JwtPayload = await verifyRefreshToken(token);

        // Check if the token stored in the cache or not
        const userRefreshTokens: UserRefreshTokens | null = await getRefreshTokens(decoded.id);

        if (!userRefreshTokens || userRefreshTokens.tokens.indexOf(token) === -1) {
            throw new Error("UnverifiedToken");
        }

        req.user = { ...req.user, pid: decoded.id };
        req.headers.authorization = token;

        return next();

    } catch (e) {
        throw e;
    }
}