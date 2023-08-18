import type { Types } from "mongoose";
import { Schema } from "mongoose";
import crypto from "node:crypto";

export const pid = {
    type: Schema.Types.Mixed,
    unique: true,
    sparse: true,
    required: true,
    immutable: true,
    default: function (this: { _id: Types.ObjectId }) {
        return crypto.createHash("md5").update(this._id.toString()).digest("hex");
    }
}

export const createdAt = { type: Date, required: true, default: Date.now };

export const base = {
    pid,
    createdAt,
    updatedAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null }
}

export const baseDataType = {
    ...base,
    note: { type: String, default: null },
    favorite: { type: Date, default: null },
    trash: { type: Date, default: null },
    userId: { type: Schema.Types.ObjectId }
}