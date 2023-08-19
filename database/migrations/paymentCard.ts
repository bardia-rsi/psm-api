import type { PaymentCardDefinition } from "../../types/Data/PaymentCard";
import { Schema } from "mongoose";
import { baseDataType } from "./common/bases";

export const paymentCardSchema = new Schema<PaymentCardDefinition>({
    ...baseDataType,
    bank: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
    owner: { type: String, required: true },
    cardNumber: { type: String, required: true },
    password: { type: String, default: null },
    cvv2: { type: String, default: null },
    expiration: { type: Date, default: null }
});

// Indexes
paymentCardSchema.index(
    { cardNumber: 1, userId: 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);