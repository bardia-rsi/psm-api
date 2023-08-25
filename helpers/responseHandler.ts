import type { Response } from "express";
import { StatusCodes } from "http-status-codes";


export const createHandler = async <T>(res: Response, callback: () => Promise<T | undefined>): Promise<Response<T | void>> => {

    const data: T | undefined = await callback();

    if (data === undefined) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.CREATED).json(data);

}

export const updateHandler = async <T>(res: Response, callback: () => Promise<T | null>): Promise<Response<T | void>> => {

    const data: T | null = await callback();

    if (data === null) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(data);

}

export const removeHandler = async (res: Response, callback: () => Promise<boolean>): Promise<Response<void>> => {

    const result: boolean = await callback();

    if (!result) {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
    }

    return res.status(StatusCodes.NO_CONTENT).end();

}

export const getHandler = async <T>(res: Response, callback: () => Promise<T | T[] | null>): Promise<Response<T | T[] | void>> => {

    const data: T | T[] | null = await callback();

    if (data === null) {
        return res.status(StatusCodes.NOT_FOUND).end();
    }

    return res.status(StatusCodes.OK).json(data);

}