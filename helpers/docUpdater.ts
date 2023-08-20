import type { Document } from "mongoose";
import { update, get, uniqBy } from "lodash";
import { keysPath } from "../utils/object";

export const updater = (doc: Document, newData: object): void => {
    keysPath(newData).forEach((path: string) => {
        update(doc, path, oldValue => {

            const newValue: any = get(newData, path);

            if (Array.isArray(oldValue)) {

                if (newValue.length === 0) {
                    return newValue;
                }

                return uniqBy([...newValue, ...oldValue], item => item.pid);

            }

            return newValue;

        });
    });
}