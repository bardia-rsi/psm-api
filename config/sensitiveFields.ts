import type { SensitiveFields } from "../types/SensitiveFields";

const sensitiveFields: Array<SensitiveFields> = ["deletedAt", "_id", "id", "__v", "userId"];

export { sensitiveFields };