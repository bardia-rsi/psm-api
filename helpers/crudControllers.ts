import type { Request, Response } from "express";
import type { Types } from "mongoose";
import { camelCase, upperFirst } from "lodash";
import { createHandler, getHandler, removeHandler, updateHandler } from "./responseHandler";
import { _id } from "../app/models/User";

interface CrudControllerMethods<T> {
    create: (req: Request, res: Response) => Promise<Response<T | void>>;
    update: (req: Request, res: Response) => Promise<Response<T | void>>;
    remove: (req: Request, res: Response) => Promise<Response<void>>;
    get: (req: Request, res: Response) => Promise<Response<T | void>>;
    getAll: (req: Request, res: Response) => Promise<Response<T[] | void>>;
    getLength: (req: Request, res: Response) => Promise<Response<number>>;
}

interface Options {
    userId: boolean;
}

const defaultOptions: Options = {
    userId: true
}

export const crudControllers = <T>(modelName: string, options: Options = defaultOptions): CrudControllerMethods<T> => {
    try {

        const model = require(`../app/models/${upperFirst(camelCase(modelName))}`);

        return {
            create: async (req: Request, res: Response): Promise<Response<T | void>> => {
                return await createHandler<T>(res, async (): Promise<T | undefined> => {

                    if (options.userId) {

                        const userId: Types.ObjectId | null = await _id(req.user.pid);

                        if (!userId) {
                            return undefined;
                        }

                        return await model.create({ ...req.body, userId });

                    }

                    return await model.create(req.body);
                });
            },
            update: async (req: Request, res: Response): Promise<Response<T | void>> => {
                return await updateHandler<T>(res, async (): Promise<T | null> => {
                    return await model.update(req.params.id, req.body);
                });
            },
            remove: async (req: Request, res: Response): Promise<Response<void>> => {
                return await removeHandler(res, async (): Promise<boolean> => {
                    return await model.remove(req.params.id);
                });
            },
            get: async <T>(req: Request, res: Response): Promise<Response<T | void>> => {
                return await getHandler(res, async (): Promise<T | null> => {
                    return await model.findOne(req.params.id);
                });
            },
            getAll: async <T>(req: Request, res: Response): Promise<Response<T[] | void>> => {
                return await getHandler(res, async (): Promise<T[]> => {

                    if (options.userId) {

                        const userId: Types.ObjectId | null = await _id(req.user.pid);

                        if (!userId) {
                            return [];
                        }

                        return await model.find(userId);

                    }

                    return await model.find();

                });
            },
            getLength: async (req: Request, res: Response): Promise<Response<number>> => {
                return await getHandler(res, async (): Promise<number | null> => {

                    const userId: Types.ObjectId | null = await _id(req.user.pid);

                    if (!userId) {
                        return null;
                    }

                    return await model.count(userId);

                })
            }
        }

    } catch (e) {
        throw e;
    }
}