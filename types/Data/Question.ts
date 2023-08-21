import { Document } from "mongoose";
import { Base } from "./Bases";

interface QuestionBase {
    question: string
}

export interface QuestionDefinition extends QuestionBase, Base {}

export interface QuestionDocument extends QuestionDefinition, Document {}

export interface QuestionData extends Omit<QuestionDefinition, "deletedAt"> {}

// Payloads
export interface QuestionCreatePayload extends QuestionBase {}

export interface QuestionUpdatePayload extends Partial<QuestionCreatePayload> {}