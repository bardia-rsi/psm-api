import { Document } from "mongoose";
import { Base, BaseDataType } from "./Bases";
import { RequiredKeys } from "../types";

interface ContactBase {
    name: string;
    phoneNumber: string;
    work: string | null;
    email: string | null;
    address: string | null;
    website: string | null;
}

export interface ContactDefinition extends ContactBase, Base, BaseDataType {}

export interface ContactDocument extends ContactDefinition, Document {}

export interface ContactData extends Omit<ContactDefinition, "deletedAt" | "userId"> {}

// Payloads
export interface ContactCreatePayload extends RequiredKeys<Partial<ContactBase & BaseDataType>, "name" | "phoneNumber"> {}

export interface ContactUpdatePayload extends Partial<ContactCreatePayload> {}