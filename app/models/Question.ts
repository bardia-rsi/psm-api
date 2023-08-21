import type { FilterQuery, Types } from "mongoose";
import type { QuestionDefinition, QuestionDocument, QuestionData, QuestionCreatePayload, QuestionUpdatePayload } from "../../types/Data/Question";
import type { PID } from "../../types/Data/Bases";
import { Model, model } from "mongoose";
import { questionSchema } from "../../database/migrations/question";
import { updater } from "../../helpers/docUpdater";

const Question: Model<QuestionDefinition> = model("Question", questionSchema);

export const create = async (data: QuestionCreatePayload): Promise<QuestionData | undefined> => {
    try {

        const doc: QuestionDocument | undefined = await new Question(data).save();

        return doc ? doc.toObject() : undefined;

    } catch (e) {
        throw e;
    }
}

export const update = async (pid: PID, data: QuestionUpdatePayload): Promise<QuestionData | null> => {
    try {

        const doc: QuestionDocument | null = await Question.findOne({ pid, deletedAt: null });

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

        const res = await Question
            .updateOne({ pid, deletedAt: null }, { deletedAt: Date.now() })
            .exec();

        return res.modifiedCount === 1;

    } catch (e) {
        throw e;
    }
}

export const findOne = async (pid: PID): Promise<QuestionData | null> => {
    try {

        const doc: QuestionDocument | null = await Question.findOne({ pid, deletedAt: null }).exec();

        return doc ? doc.toObject() : null;

    } catch (e) {
        throw e;
    }
}

export const find = async (filter: FilterQuery<QuestionDefinition> = {}): Promise<QuestionData[]> => {
    try {

        const docs: QuestionDocument[] = await Question.find({ deletedAt: null, ...filter }).exec();

        return docs.map(doc => doc.toObject());

    } catch (e) {
        throw e;
    }
}

export const _id = async (pid: PID): Promise<Types.ObjectId | null> => {
    try {

        const doc: QuestionDocument | null = await Question
            .findOne({ pid, deletedAt: null })
            .select("_id")
            .exec();

        return doc ? doc._id : null;

    } catch (e) {
        throw e;
    }
}