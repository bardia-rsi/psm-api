import { Types } from "mongoose";

export type CreatedAt = Date;

export type PID = string;

export interface PasswordElement {
    pid?: PID;
    content: string;
    createdAt?: CreatedAt;
}

export interface Base {
    pid: PID;
    createdAt: CreatedAt;
    updatedAt: Date;
    deletedAt: Date;
}

export interface BaseDataType {
    note: string | null;
    favorite: Date | null;
    trash: Date | null;
    userId: Types.ObjectId;
}