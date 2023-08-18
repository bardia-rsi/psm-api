import { Base, BaseDataType } from "./Bases";

interface ContactBase {
    name: string;
    phoneNumber: string;
    work: string | null;
    email: string | null;
    address: string | null;
    website: string | null;
}

export interface ContactDefinition extends ContactBase, Base, BaseDataType {}