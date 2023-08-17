import type { Schema } from "mongoose";
import type { StringMap } from "../../types/Base";
import { isObject, sortByKeys } from "../../utils/object";
import { sensitiveFields } from "../../types/SensitiveFields";

const removeSensitiveFields = (doc: StringMap): object => {
    sensitiveFields.forEach((field: string) => {

        delete doc?.[field];

        if (isObject(doc[field])) {
            doc[field] = removeSensitiveFields(doc[field]);
        }
    });

    return doc;
}

const transformer = (schema: Schema): void => {
    schema.set("toObject", {
        virtuals: true,
        transform: (_, ret) => sortByKeys(removeSensitiveFields(ret))
    });
}

export default transformer;