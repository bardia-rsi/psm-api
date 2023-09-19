import type { Request, Response } from "express";
import type { Types } from "mongoose";
import type { FilterQuery } from "mongoose";
import type { ItemData } from "../../../../types/Data/Item";
import type { DataTypes, DataTypesPlural } from "../../../../types/DataTypes";
import type { DictionaryUnion } from "../../../../types/Base";
import { upperFirst, camelCase, orderBy } from "lodash";
import { getHandler } from "../../../../helpers/responseHandler";
import { _id } from "../../../models/User";

interface Lengths extends DictionaryUnion<DataTypesPlural | "all" | "trash" | "favorites", number> {}

const types: DataTypes[] = ["contact", "login", "paymentCard", "wifiPassword"];
const typesPlural: DataTypesPlural[] = ["contacts", "logins", "paymentCards", "wifiPasswords"];

const model = (name: string) => require(`../../../models/${upperFirst(camelCase(name))}`);

const getLengthOfType = async (userId: Types.ObjectId, filter: FilterQuery<ItemData>): Promise<number> => {

    let length: number = 0;

    for (let i = 0; i < types.length; i ++) {
        length += await model(types[i]).count(userId, filter);
    }

    return length;

}

export const getAll = (filter: FilterQuery<ItemData>, sortBy: string[]) =>
    async (req: Request, res: Response): Promise<Response<ItemData[]>> =>
        await getHandler(res, async () => {

            let records: ItemData[] = [];
            const userId: Types.ObjectId | null = await _id(req.user.pid);

            if (!userId) {
                return [];
            }

            for (let i = 0; i < types.length; i++) {
                records = records.concat((await model(types[i]).find(userId, filter)).map((record: ItemData) => ({
                    ...record, type: types[i]
                })));
            }

            return orderBy<ItemData>(records, sortBy, ["desc"]);

        });

export const getLength = (filter: FilterQuery<ItemData>) =>
    async (req: Request, res: Response): Promise<Response<number>> =>
        await getHandler(res, async () => {

            const userId: Types.ObjectId | null = await _id(req.user.pid);

            if (!userId) {
                return null;
            }

            return getLengthOfType(userId, filter);

        });

export const getAllLengths = () =>
    async (req: Request, res: Response): Promise<Response<Lengths>> =>
        await getHandler(res, async () => {

            const userId: Types.ObjectId | null = await _id(req.user.pid);
            const lengths: Lengths = {
                all: 0,
                trash: 0,
                favorites: 0,
                contacts: 0,
                logins: 0,
                paymentCards: 0,
                wifiPasswords: 0
            }

            if (!userId) {
                return null;
            }

            for (let i = 0; i < types.length; i++) {
                lengths[typesPlural[i]] = await model(types[i]).count(userId);
            }

            lengths.all = await getLengthOfType(userId, {});
            lengths.trash = await getLengthOfType(userId, { trash: { $ne: null } });
            lengths.favorites = await getLengthOfType(userId, { favorite: { $ne: null } });

            return lengths;

        });