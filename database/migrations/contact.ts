import type { ContactDefinition } from "../../types/Data/Contact";
import { Schema } from "mongoose";
import { baseDataType } from "./common/bases";

export const contactSchema = new Schema<ContactDefinition>({
    ...baseDataType,
    name: { type: String, required: true },
    work: { type: String, default: null },
    phoneNumber: { type: String, required: true },
    email: { type: String, default: null },
    address: { type: String, default: null },
    website: { type: String, default: null },
});

// Indexes
contactSchema.index(
    { name: 1, userId: 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);

contactSchema.index(
    { phoneNumber: 1, userId: 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);