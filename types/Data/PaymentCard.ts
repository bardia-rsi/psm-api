import { Document, Types } from "mongoose";
import { Base, BaseDataType, PID } from "./Bases";
import { CompanyData } from "./Company";
import { RequiredKeys } from "../types";

interface PaymentCardBase {
    owner: string;
    cardNumber: string;
    password: string | null;
    cvv2: string | null;
    expiration: Date | null;
}

export interface PaymentCardDefinition extends PaymentCardBase, Base, BaseDataType {
    bank: Types.ObjectId;
}

export interface PaymentCardDocument extends PaymentCardDefinition, Document {}

export interface PaymentCardData extends Omit<PaymentCardBase & Base & BaseDataType, "deletedAt" | "userId"> {
    bank: CompanyData;
}

// Payloads
export interface PaymentCardCreatePayload extends RequiredKeys<Partial<PaymentCardBase & BaseDataType>, "owner" | "cardNumber"> {
    bank: PID;
}

export interface PaymentCardUpdatePayload extends Partial<PaymentCardCreatePayload> {}