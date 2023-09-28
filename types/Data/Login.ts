import { Document, Types } from "mongoose";
import { Base, BaseDataType, PID } from "./Bases"
import { CompanyData } from "./Company";
import { RequiredKeys } from "../types";

interface LoginBase {
    url: string;
    email: string | null;
    username: string | null;
    password: string;
    phoneNumber: string | null;
}

export interface LoginDefinition extends LoginBase, Base, BaseDataType {
    company: Types.ObjectId;
    lastUsed: Date | null;
}

export interface LoginDocument extends LoginDefinition, Document {}

export interface LoginData extends Omit<LoginBase & Base & BaseDataType, "deletedAt" | "userId"> {
    company: CompanyData;
}

// Payloads
export interface LoginCreatePayload extends RequiredKeys<Partial<LoginBase & BaseDataType>, "url"> {
    company: PID;
}

export interface LoginUpdatePayload extends Partial<LoginCreatePayload> {}