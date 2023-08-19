import { Types } from "mongoose";
import { Base, BaseDataType } from "./Bases";

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