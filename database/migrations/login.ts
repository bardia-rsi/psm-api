import type { LoginDefinition } from "../../types/Data/Login";
import { Schema } from "mongoose";
import { baseDataType } from "./common/bases";

export const loginSchema = new Schema<LoginDefinition>({
    ...baseDataType,
    company: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
    url: { type: String, required: true },
    email: { type: String, default: null },
    password: { type: String, required: true },
    username: { type: String, default: null },
    phoneNumber: { type: String, default: null },
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