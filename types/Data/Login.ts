import { Types } from "mongoose";
import { Base, BaseDataType, PID, PasswordElement } from "./Bases";

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