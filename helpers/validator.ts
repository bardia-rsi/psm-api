import type { Schema } from "joi";

export interface ValidationError {
    message: string;
    path: string;
}

type ValidatorResult = {
    error: ValidationError;
    value: undefined;
} | {
    error: undefined;
    value: object;
}

export const validator = async (filename: string, schemaName: string, body: object): Promise<ValidatorResult> => {
    try {

        const schema: Schema | undefined = (await import(`../schemas/${filename}`))[schemaName];

        if (!schema) {
            throw new Error("SchemaNotFound");
        }

        const { error, value } = schema.validate(body, {
            abortEarly: true,
            allowUnknown: false,
            convert: true,
            dateFormat: "date",
            stripUnknown: true
        });

        if (error) {
            return {
                error: {
                    message: error.details[0].message,
                    path: error.details[0].path.join("."),
                },
                value: undefined
            };
        }

        return { error: undefined, value };

    } catch (e) {
        throw e;
    }
}