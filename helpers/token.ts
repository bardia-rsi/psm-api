import type { PID } from "../types/Data/Bases";
import type { UserRefreshTokens } from "../types/UserRefreshTokens";
import * as jwt from "jsonwebtoken";
import redis from "../lib/redis";

export const verify = (token: string, secret: string, options: jwt.VerifyOptions = {}): jwt.JwtPayload => {
    try {

        const decoded: string | jwt.JwtPayload = jwt.verify(token, secret, options);

        if (typeof decoded === "string") {
            return JSON.parse(decoded);
        }

        return decoded;

    } catch(e) {
        throw e;
    }
}

export const decode = (token: string, options: jwt.DecodeOptions = {}): jwt.JwtPayload => {

    const decoded: string | jwt.JwtPayload | null = jwt.decode(token, options);

    if (!decoded) {
        throw new jwt.JsonWebTokenError("Invalid token");
    }

    if (typeof decoded === "string") {
        return JSON.parse(decoded);
    }

    return decoded;

}

export const createRefreshToken = (userId: PID, userDevice: string, expiration: number = Number(process.env.REFRESH_TOKEN_EXPIRATION_PERIOD)): string => {
    return jwt.sign({ id: userId, device: userDevice }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: expiration });
}

export const storeRefreshToken = async (userId: PID, token: string): Promise<boolean> => {
    try {

        const storedTokens: string | null = await redis.get(userId);
        const newTokens: UserRefreshTokens = { tokens: [] }

        if (!storedTokens) {
            newTokens.tokens = [token];
        } else {
            newTokens.tokens = JSON.parse(storedTokens).tokens;
            newTokens.tokens.push(token);
        }

        return (await redis.set(userId, JSON.stringify(newTokens))) === "OK";

    } catch (e) {
        throw e;
    }
}

export const removeCachedRefreshToken = async (userId: PID, token: string): Promise<null | boolean> => {
    try {

        const storedTokens: string | null = await redis.get(userId);

        if (!storedTokens) {
            return null;
        }

        const storedTokensObj: UserRefreshTokens = JSON.parse(storedTokens);
        const tokenIndex: number = storedTokensObj.tokens.indexOf(token);

        if (tokenIndex === -1) {
            return null;
        }

        storedTokensObj.tokens.splice(tokenIndex, 1);

        if (storedTokensObj.tokens.length === 0) {
            return await redis.del(userId) === 1;
        }

        return (await redis.set(userId, JSON.stringify(storedTokensObj))) === "OK"

    } catch (e) {
        throw e;
    }
}

export const getRefreshTokens = async (userId: PID): Promise<null | UserRefreshTokens> => {
    try {

        const tokens: string | null = await redis.get(userId);

        if (!tokens) {
            return null;
        }

        return JSON.parse(tokens);

    } catch (e) {
        throw e;
    }
}

export const verifyRefreshToken = async (token: string): Promise<jwt.JwtPayload> => {
    try {
        return verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (e: jwt.VerifyErrors | any) {

        if (e.name === "TokenExpiredError") {
            // Remove the expired token
            await removeCachedRefreshToken(decode(token).id, token);

            throw new jwt.TokenExpiredError("RefreshToken expired", e.expiredAt);
        }

        throw e;

    }
}

export const createAccessToken = (refreshToken: string, expiration: number = Number(process.env.ACCESS_TOKEN_EXPIRATION_PERIOD)): string => {
    return jwt.sign({ token: refreshToken }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiration });
}