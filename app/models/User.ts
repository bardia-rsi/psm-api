import type { FilterQuery, Types } from "mongoose";
import type { UserDefinition, UserDocument, UserData, UserCreatePayload, UserUpdatePayload } from "../../types/Data/User";
import type { PID } from "../../types/Data/Bases";
import { Model, model } from "mongoose";
import { hash } from "bcrypt";
import { userSchema } from "../../database/migrations/user";
import { updater } from "../../helpers/docUpdater";
import { _id as QuestionId } from "./Question";

const User: Model<UserDefinition> = model("User", userSchema);

export const create = async (data: UserCreatePayload): Promise<UserData | undefined> => {
    try {

        if (data.login.securityQuestions) {
            for (let i: number = 0; i < data.login.securityQuestions.length; i++) {

                const id: Types.ObjectId | null = await QuestionId(data.login.securityQuestions[i].question);

                if (!id) {
                    return undefined;
                }

                data.login.securityQuestions[i].question = id.toString();

            }
        }

        if (data.login?.password.current) {
            data.login.password.current.content = await hash(data.login.password.current.content, 10);
        }

        const doc: UserDocument | undefined = await new User(data).save();

        return doc ? await findOne({ pid: doc.pid }) ?? undefined : undefined;

    } catch (e) {
        throw e;
    }
}

export const update = async (pid: PID, data: UserUpdatePayload): Promise<UserData | null> => {
    try {

        const doc: UserDocument | null = await User.findOne({ pid, deletedAt: null });

        if (!doc) {
            return null;
        }

        if (data.login?.securityQuestions) {
            for (let i: number = 0; i < data.login.securityQuestions.length; i++) {

                const id: Types.ObjectId | null = await QuestionId(data.login.securityQuestions[i].question);

                if (!id) {
                    return null;
                }

                data.login.securityQuestions[i].question = id.toString();

            }
        }

        if (data.login?.password.current) {
            data.login.password.current.content = await hash(data.login.password.current.content, 10);
        }

        updater(doc, data);

        await doc.save();

        return doc ? await findOne({ pid: doc.pid }) : null;

    } catch (e) {
        throw e;
    }
}

export const remove = async (pid: PID): Promise<boolean> => {
    try {

        const res = await User
            .updateOne({ pid, deletedAt: null }, { deletedAt: Date.now() })
            .exec();

        return res.modifiedCount === 1;

    } catch (e) {
        throw e;
    }
}

export const findOne = async (filter: FilterQuery<UserDefinition> = {}): Promise<UserData | null> => {
    try {

        const doc: UserDocument | null = await User.findOne({ deletedAt: null, ...filter })
            .populate({
                path: "login.securityQuestions.question",
                transform: doc => doc.question
            })
            .exec();

        return doc ? doc.toObject() : null;

    } catch (e) {
        throw e;
    }
}

export const _id = async (pid: PID): Promise<Types.ObjectId | null> => {
    try {

        const doc: UserDocument | null = await User.findOne({ pid, deletedAt: null }).select("_id").exec();

        return doc ? doc._id : null;

    } catch (e) {
        throw e;
    }
}