export type CreatedAt = Date;

export type PID = string;

export interface Base {
    pid: PID;
    createdAt: CreatedAt;
    updatedAt: Date;
    deletedAt: Date;
}