import type { FilterQuery, Types } from "mongoose";
import type { LoginDefinition, LoginDocument, LoginData, LoginCreatePayload, LoginUpdatePayload } from "../../types/Data/Login";
import type { PID } from "../../types/Data/Bases";
import { Model, model } from "mongoose";
import { loginSchema } from "../../database/migrations/login";
import { updater } from "../../helpers/docUpdater";
import { _id } from "./Company";

const Login: Model<LoginDefinition> = model("Login", loginSchema);

export const create = async (data: LoginCreatePayload): Promise<LoginData | undefined> => {
    try {

        const id: Types.ObjectId | null = await _id(data.company);

        if (!id) {
            return undefined;
        }

        const doc: LoginDocument | undefined = await new Login({ ...data, company: id }).save();

        return doc ? (await doc.populate("company", "-createdAt -updatedAt")).toObject() : undefined;

    } catch (e) {
        throw e;
    }
}

export const update = async (pid: PID, data: LoginUpdatePayload): Promise<LoginData | null> => {
    try {

        if (data.company) {

            const id: Types.ObjectId | null = await _id(data.company);

            if (!id) {
                return null;
            }

            data.company = id.toString();

        }

        const doc: LoginDocument | null = await Login.findOne({ pid, deletedAt: null });

        if (!doc) {
            return null;
        }

        updater(doc, data);

        await doc.save();

        return (await doc.populate("company", "-createdAt -updatedAt")).toObject();

    } catch (e) {
        throw e;
    }
}

export const remove = async (pid: PID): Promise<boolean> => {
    try {

        const res = await Login
            .updateOne({ pid, deletedAt: null }, { deletedAt: Date.now() })
            .exec();

        return res.modifiedCount === 1;

    } catch (e) {
        throw e;
    }
}

export const findOne = async (pid: PID): Promise<LoginData | null> => {
    try {

        const doc: LoginDocument | null = await Login.findOne({ pid, deletedAt: null })
            .populate("company", "-createdAt -updatedAt")
            .exec();

        return doc ? doc.toObject() : null;

    } catch (e) {
        throw e;
    }
}

export const find = async (userId: Types.ObjectId, filter: FilterQuery<LoginDefinition> = {}): Promise<LoginData[]> => {
    try {

        const docs: LoginDocument[] = await Login.find({ deletedAt: null, trash: null, userId, ...filter })
            .populate("company", "-createdAt -updatedAt")
            .exec();

        return docs.map(doc => doc.toObject());

    } catch (e) {
        throw e;
    }
}

export const count = async (userId: Types.ObjectId, filter: FilterQuery<LoginDefinition> = {}): Promise<number> => {
    try {
        return await Login.countDocuments({ deletedAt: null, trash: null, userId, ...filter });
    } catch (e) {
        throw e;
    }
}