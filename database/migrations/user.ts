import type { UserDefinition } from "../../types/Data/User";
import { Schema } from "mongoose";
import { base, pid, createdAt } from "./common/bases";

export const userSchema = new Schema<UserDefinition>({
    ...base,
    login: {
        username: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, default: null },
        password: {
            history: [{
                pid,
                content: { type: String, required: true },
                createdAt,
            }]
        },
        securityQuestions: [{
            pid,
            question: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
            answer: { type: String, required: true }
        }]
    },
    personalInfo: {
        name: { type: String, default: null },
        dateOfBirth: { type: Date, default: null },
        gender: { type: String, default: null }
    },
    address: {
        country: { type: String, default: null },
        state: { type: String, default: null },
        city: { type: String, default: null },
        street: { type: String, default: null },
        postalCode: { type: String, default: null }
    },
    security: {
        lastActivities: [{
            pid,
            ip: { type: String, required: true },
            os: { type: String, required: true },
            time: {
                zone: { type: String, required: true },
                local: { type: Date, required: true }
            },
        }],
        twoStepVerification: { type: Boolean, default: false }
    },
    subscription: {
        plan: { type: String, default: "standard" },
        status: { type: String, default: "active" },
        period: { type: String, default: null },
        expire: { type: Date, default: null },
        history: [{
            pid,
            plan: { type: String, required: true },
            period: { type: String, required: true },
            expire: { type: Date, required: true },
        }]
    }
});

// Indexes
userSchema.index(
    { "login.username": 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);

userSchema.index(
    { "login.email": 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);

userSchema.index(
    { "login.phoneNumber": 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null, "login.phoneNumber": { $type: "string" } } }
);

// Virtual Fields
userSchema.virtual<UserDefinition>("login.password.current")
    .get<UserDefinition>(function (): object {
        return this.login.password.history[this.login.password.history.length - 1];
    })
    .set<UserDefinition>(function (value: { content: string }) {

        if (!this.login.password.history) {
            this.login.password.history = [];
        }

        this.login.password.history.push({ content: value.content });

    });