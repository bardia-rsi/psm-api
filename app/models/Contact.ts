import type { FilterQuery, Types } from "mongoose";
import type { ContactDefinition, ContactDocument, ContactData, ContactCreatePayload, ContactUpdatePayload } from "../../types/Data/Contact";
import type { PID } from "../../types/Data/Bases";
import { Model, model } from "mongoose";
import { contactSchema } from "../../database/migrations/contact";
import { updater } from "../../helpers/docUpdater";

const Contact: Model<ContactDefinition> = model("Contact", contactSchema);

export const create = async (data: ContactCreatePayload): Promise<ContactData | undefined> => {
    try {

        const doc: ContactDocument | undefined = await new Contact(data).save();

        return doc ? doc.toObject() : undefined;

    } catch (e) {
        throw e;
    }
}

export const update = async (pid: PID, data: ContactUpdatePayload): Promise<ContactData | null> => {
    try {

        const doc: ContactDocument | null = await Contact.findOne({ pid, deletedAt: null });

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

        const res = await Contact
            .updateOne({ pid, deletedAt: null }, { deletedAt: Date.now() })
            .exec();

        return res.modifiedCount === 1;

    } catch (e) {
        throw e;
    }
}

export const findOne = async (pid: PID): Promise<ContactData | null> => {
    try {

        const doc: ContactDocument | null = await Contact.findOne({ pid, deletedAt: null }).exec();

        return doc ? doc.toObject() : null;

    } catch (e) {
        throw e;
    }
}

export const find = async (userId: Types.ObjectId, filter: FilterQuery<ContactDefinition> = {}): Promise<ContactData[]> => {
    try {

        const docs: ContactDocument[] = await Contact
            .find({ deletedAt: null, trash: null, userId, ...filter })
            .exec();

        return docs.map(doc => doc.toObject());

    } catch (e) {
        throw e;
    }
}

export const count = async (userId: Types.ObjectId, filter: FilterQuery<ContactDefinition> = {}): Promise<number> => {
    try {
        return await Contact.countDocuments({ deletedAt: null, trash: null, userId, ...filter });
    } catch (e) {
        throw e;
    }
}