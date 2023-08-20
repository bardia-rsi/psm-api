import { Document } from "mongoose";
import { Base } from "./Bases";
import { RecursivePartial } from "../types";

interface CompanyBase {
    name: string;
    website: string;
    about: string;
    logo: string;
    colors: {
        logo: {
            dark: string | null;
            light: string | null;
        },
        bg: {
            dark: string | null;
            light: string | null;
        }
    };
    isBank: boolean;
}

export interface CompanyDefinition extends CompanyBase, Base {}

export interface CompanyDocument extends CompanyDefinition, Document {}

export interface CompanyData extends Omit<CompanyDefinition, "deletedAt"> {}

// Payloads
export interface CompanyCreatePayload extends CompanyBase {}

export interface CompanyUpdatePayload extends RecursivePartial<CompanyCreatePayload> {}