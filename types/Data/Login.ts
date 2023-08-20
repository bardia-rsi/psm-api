import { Document, Types } from "mongoose";
import { Base, BaseDataType, PID, PasswordElement } from "./Bases"
import { CompanyData } from "./Company";
import { RequiredKeys } from "../types";

interface LoginBase {
    url: string;
    email: string | null;
    username: string | null;
    securityQuestions: {
        readonly pid: PID;
        question: string;
        answer: string;
    }[];
    phoneNumber: string | null;
    name: string | null;
    gender: string | null;
    address: string | null;
}

export interface LoginDefinition extends LoginBase, Base, BaseDataType {
    company: Types.ObjectId;
    password: {
        history: PasswordElement[];
    };
    lastUsed: Date | null;
}

export interface LoginDocument extends LoginDefinition, Document {}

export interface LoginData extends Omit<LoginBase & Base & BaseDataType, "deletedAt" | "userId"> {
    company: CompanyData;
    password: {
        history: PasswordElement[];
        current: Required<PasswordElement>;
    }
}

// Payloads
export interface LoginCreatePayload extends RequiredKeys<Partial<LoginBase & BaseDataType>, "url"> {
    company: PID;
    password?: string;
}

export interface LoginUpdatePayload extends Partial<LoginCreatePayload> {}