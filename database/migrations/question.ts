import type { QuestionDefinition } from "../../types/Data/Question";
import { Schema } from "mongoose";
import { base } from "./common/bases";

export const questionSchema = new Schema<QuestionDefinition>({
    ...base,
    question: { type: String, required: true }
});

// Indexes
questionSchema.index(
    { question: 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);