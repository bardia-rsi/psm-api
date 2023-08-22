import type { FilterQuery, Types } from "mongoose";
import type { WifiPasswordDefinition, WifiPasswordDocument, WifiPasswordData, WifiPasswordCreatePayload, WifiPasswordUpdatePayload } from "../../types/Data/WifiPassword";
import type { PID } from "../../types/Data/Bases";
import { Model, model } from "mongoose";
import { wifiPasswordSchema } from "../../database/migrations/wifiPassword";
import { updater } from "../../helpers/docUpdater";

const WifiPassword: Model<WifiPasswordDefinition> = model("WifiPassword", wifiPasswordSchema);

export const create = async (data: WifiPasswordCreatePayload): Promise<WifiPasswordDefinition | undefined> => {
    try {

        const doc: WifiPasswordDocument | undefined = await new WifiPassword(data).save();

        return doc ? doc.toObject() : undefined;

    } catch (e) {
        throw e;
    }
}

export const update = async (pid: PID, data: WifiPasswordUpdatePayload): Promise<WifiPasswordDefinition | null> => {
    try {

        const doc: WifiPasswordDocument | null = await WifiPassword.findOne({ pid, deletedAt: null });

        if (!doc) {
            return null;
        }

        updater(doc, data);

        await doc.save();

        return doc.toObject();

    } catch (e) {
        throw e;
    }
}

export const remove = async (pid: PID): Promise<boolean> => {
    try {

        const res = await WifiPassword
            .updateOne({ pid, deletedAt: null }, { deletedAt: Date.now() })
            .exec();

        return res.modifiedCount === 1;

    } catch (e) {
        throw e;
    }
}

export const findOne = async (pid: PID): Promise<WifiPasswordData | null> => {
    try {

        const doc: WifiPasswordDocument | null = await WifiPassword.findOne({ pid, deletedAt: null }).exec();

        return doc ? doc.toObject() : null;

    } catch (e) {
        throw e;
    }
}

export const find = async (userId: Types.ObjectId, filter: FilterQuery<WifiPasswordDefinition> = {}): Promise<WifiPasswordData[]> => {
    try {

        const docs: WifiPasswordDocument[] = await WifiPassword
            .find({ deletedAt: null, trash: null, userId, ...filter })
            .exec();

        return docs.map(doc => doc.toObject());

    } catch (e) {
        throw e;
    }
}

export const count = async (userId: Types.ObjectId, filter: FilterQuery<WifiPasswordDefinition> = {}): Promise<number> => {
    try {
        return await WifiPassword.countDocuments({ deletedAt: null, trash: null, userId, ...filter });
    } catch (e) {
        throw e;
    }
}