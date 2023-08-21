import type { FilterQuery, Types } from "mongoose";
import type { PaymentCardDefinition, PaymentCardDocument, PaymentCardData, PaymentCardCreatePayload, PaymentCardUpdatePayload } from "../../types/Data/PaymentCard";
import type { PID } from "../../types/Data/Bases";
import { Model, model } from "mongoose";
import { paymentCardSchema } from "../../database/migrations/paymentCard";
import { updater } from "../../helpers/docUpdater";
import { _id } from "./Company";

const PaymentCard: Model<PaymentCardDefinition> = model("PaymentCard", paymentCardSchema);

export const create = async (data: PaymentCardCreatePayload): Promise<PaymentCardData | undefined> => {
    try {

        const id: Types.ObjectId | null = await _id(data.bank);

        if (!id) {
            return undefined;
        }

        const doc: PaymentCardDocument | undefined = await new PaymentCard({ ...data, bank: id }).save();

        return doc ? (await doc.populate("bank", "-createdAt -updatedAt")).toObject() : undefined;

    } catch (e) {
        throw e;
    }
}

export const update = async (pid: PID, data: PaymentCardUpdatePayload): Promise<PaymentCardData | null> => {
    try {

        if (data.bank) {

            const id: Types.ObjectId | null = await _id(data.bank);

            if (!id) {
                return null;
            }

            data.bank = id.toString();

        }

        const doc: PaymentCardDocument | null = await PaymentCard.findOne({ pid, deletedAt: null });

        if (!doc) {
            return null;
        }

        updater(doc, data);

        await doc.save();

        return (await doc.populate("bank", "-createdAt -updatedAt")).toObject();

    } catch (e) {
        throw e;
    }
}

export const remove = async (pid: PID): Promise<boolean> => {
    try {

        const res = await PaymentCard
            .updateOne({ pid, deletedAt: null }, { deletedAt: Date.now() })
            .exec();

        return res.modifiedCount === 1;

    } catch (e) {
        throw e;
    }
}

export const findOne = async (pid: PID): Promise<PaymentCardData | null> => {
    try {

        const doc: PaymentCardDocument | null = await PaymentCard.findOne({ pid, deletedAt: null })
            .populate("bank", "-createdAt -updatedAt")
            .exec();

        return doc ? doc.toObject() : null;

    } catch (e) {
        throw e;
    }
}

export const find = async (userId: Types.ObjectId, filter: FilterQuery<PaymentCardDefinition> = {}): Promise<PaymentCardData[]> => {
    try {

        const docs: PaymentCardDocument[] = await PaymentCard
            .find({ deletedAt: null, trash: null, userId, ...filter })
            .populate("bank", "-createdAt -updatedAt")
            .exec();

        return docs.map(doc => doc.toObject());

    } catch (e) {
        throw e;
    }
}

export const count = async (userId: Types.ObjectId, filter: FilterQuery<PaymentCardDefinition> = {}): Promise<number> => {
    try {
        return await PaymentCard.countDocuments({ deletedAt: null, trash: null, userId, ...filter });
    } catch (e) {
        throw e;
    }
}