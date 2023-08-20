import type { FilterQuery, Types } from "mongoose";
import type { CompanyDefinition, CompanyDocument, CompanyData, CompanyCreatePayload, CompanyUpdatePayload } from "../../types/Data/Company";
import type { PID } from "../../types/Data/Bases";
import { Model, model } from "mongoose";
import { companySchema } from "../../database/migrations/company";
import { updater } from "../../helpers/docUpdater";

const Company: Model<CompanyDefinition> = model("Company", companySchema);

export const create = async (data: CompanyCreatePayload): Promise<CompanyData | undefined> => {
    try {

        const doc: CompanyDocument | undefined = await new Company(data).save();

        return doc ? doc.toObject() : undefined;

    } catch (e) {
        throw e;
    }
}

export const update = async (pid: PID, data: CompanyUpdatePayload): Promise<CompanyData | null> => {
    try {

        const doc: CompanyDocument | null = await Company.findOne({ pid, deletedAt: null });

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

        const res = await Company
            .updateOne({ pid, deletedAt: null }, { deletedAt: Date.now() })
            .exec();

        return res.modifiedCount === 1;

    } catch (e) {
        throw e;
    }
}

export const findOne = async (pid: PID): Promise<CompanyData | null> => {
    try {

        const doc: CompanyDocument | null = await Company.findOne({ pid, deletedAt: null }).exec();

        return doc ? doc.toObject() : null;

    } catch (e) {
        throw e;
    }
}

export const find = async (filter: FilterQuery<CompanyDefinition> = {}): Promise<CompanyData[]> => {
    try {

        const docs: CompanyDocument[] = await Company.find({ deletedAt: null, ...filter }).exec();

        return docs.map(doc => doc.toObject());

    } catch (e) {
        throw e;
    }
}

export const _id = async (pid: PID): Promise<Types.ObjectId | null> => {
    try {

        const doc: CompanyDocument | null = await Company
            .findOne({ pid, deletedAt: null })
            .select("_id")
            .exec();

        return doc ? doc._id : null;

    } catch (e) {
        throw e;
    }
}