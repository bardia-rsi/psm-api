const sensitiveFieldsReadonly = ["deletedAt", "_id", "id", "__v", "userId"] as const;
export const sensitiveFields: string[] = Array(...sensitiveFieldsReadonly);

export type SensitiveFields = typeof sensitiveFieldsReadonly[number];