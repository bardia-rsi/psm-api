import type { WifiPasswordDefinition } from "../../types/Data/WifiPassword";
import { Schema } from "mongoose";
import { baseDataType } from "./common/bases";

export const wifiPasswordSchema = new Schema<WifiPasswordDefinition>({
    ...baseDataType,
    name: { type: String, required: true },
    url: { type: String, default: null },
    password: { type: String, default: null },
    routerUsername: { type: String, default: "admin" },
    routerPassword: { type: String, default: "admin" },
});

// Indexes
wifiPasswordSchema.index(
    { name: 1, userid: 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);