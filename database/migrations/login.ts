import type { LoginDefinition } from "../../types/Data/Login";
import { Schema } from "mongoose";
import { baseDataType, pid, createdAt } from "./common/bases";

export const loginSchema = new Schema<LoginDefinition>({
    ...baseDataType,
    company: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
    url: { type: String, required: true },
    email: { type: String, default: null },
    password: {
        history: [{
            pid,
            content: { type: String, required: true },
            createdAt
        }]
    },
    username: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    securityQuestions: [{
        pid,
        question: { type: String, required: true },
        answer: { type: String, required: true },
    }],
    name: { type: String, default: null },
    gender: { type: String, default: null },
    address: { type: String, default: null },
    lastUsed: { type: Date, default: null }
});

// Indexes
loginSchema.index(
    { company: 1, url: 1, email: 1, username: 1, phoneNumber: 1, userId: 1, deletedAt: 1 },
    {
        unique: true,
        partialFilterExpression: {
            deletedAt: null,
            $and: [
                { company: { $exists: true } },
                { url: { $exists: true } },
                { email: { $exists: true } },
                { username: { $exists: true } },
                { phoneNumber: { $exists: true } },
                { userId: { $exists: true } }
            ]
        }
    }
);

// Virtual fields
loginSchema.virtual<LoginDefinition>("password.current")
    .get<LoginDefinition>(function (): object {
        return this.password.history[this.password.history.length - 1];
    })
    .set<LoginDefinition>(function (value: { content: string }) {

        if (!this.password.history) {
            this.password.history = [];
        }

        this.password.history.push({ content: value.content });

    });