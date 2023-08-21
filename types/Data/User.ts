import { Document, Types } from "mongoose";
import { Base, PID, PasswordElement } from "./Bases";
import { RecursivePartial } from "../types";

interface UserBase {
    personalInfo: {
        name: string | null;
        dateOfBirth: Date | null;
        gender: string | null;
    };
    address: {
        country: string | null;
        state: string | null;
        city: string | null;
        street: string | null;
        postalCode: string | null;
    };
    security: {
        lastActivities: {
            pid?: PID;
            ip: string;
            os: string;
            time: {
                zone: string;
                local: Date;
            };
        }[];
        twoStepVerification: boolean;
    };
    subscription: {
        plan: string;
        status: string;
        period: string | null;
        expire: Date | null;
        history: {
            pid?: PID;
            plan: string;
            period: string;
            expire: Date;
        }[];
    };
}

interface LoginBaseObject {
    username: string;
    email: string;
    phoneNumber: string;
}

export interface UserDefinition extends UserBase, Base {
    login: LoginBaseObject & {
        password: {
            history: PasswordElement[];
        };
        securityQuestions: {
            pid: PID;
            question: Types.ObjectId;
            answer: string;
        }[];
    };
}

export interface UserDocument extends UserDefinition, Document {}

export interface UserData extends Omit<UserBase & Base, "deletedAt"> {
    login: LoginBaseObject & {
        password: {
            history: PasswordElement[];
            current: Required<PasswordElement>;
        };
        securityQuestions: {
            pid: PID;
            question: string;
            answer: string;
        }[];
    };
}

export interface UserJsonData extends Omit<UserBase & Base, "deletedAt"> {
    login: LoginBaseObject;
    accessToken?: string;
    refreshToken?: string;
}

// Payloads
export interface UserCreatePayload extends RecursivePartial<UserBase & Base> {
    login: {
        username: string;
        email: string;
        phoneNumber: string;
        password: {
            current: {
                content: string;
            };
        };
        securityQuestions: {
            question: PID;
            answer: string;
        }[];
    }
}

export interface UserUpdatePayload extends Partial<UserCreatePayload> {}