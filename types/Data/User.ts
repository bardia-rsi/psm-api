import { Types } from "mongoose";
import { Base, PID, PasswordElement } from "./Bases";

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