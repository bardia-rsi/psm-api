import { Document } from "mongoose";
import { Base, BaseDataType } from "./Bases";
import { RequiredKeys } from "../types";

interface WifiPasswordBase {
    name: string;
    password: string;
    url: string | null;
    routerUsername: string | null;
    routerPassword: string | null;
}

export interface WifiPasswordDefinition extends WifiPasswordBase, Base, BaseDataType {}

export interface WifiPasswordDocument extends WifiPasswordDefinition, Document {}

export interface WifiPasswordData extends Omit<WifiPasswordDefinition, "deletedAt" | "userId"> {}

// Payloads
export interface WifiPasswordCreatePayload extends RequiredKeys<Partial<WifiPasswordBase & BaseDataType>, "name" | "password"> {}

export interface WifiPasswordUpdatePayload extends Partial<WifiPasswordCreatePayload> {}