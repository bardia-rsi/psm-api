import type { StringMap } from "../types/Base";

export const isObject = (v: any): boolean => Object.prototype.toString.call(v) === "[object Object]";

export const sortByKeys = (obj: StringMap) => {

    const sortedObj: StringMap = {};

    Object.keys(obj).sort().forEach((key: string) => {

        sortedObj[key] = obj[key];

        // Sort the nested objects
        if (isObject(obj[key])) {
            sortedObj[key] = sortByKeys(obj[key]);

        }
        // Sort the array of objects
        if (Array.isArray(obj[key])) {
            sortedObj[key] = obj[key].map((item: any) => {
                if (isObject(item)) {
                    return sortByKeys(item);
                }
                return item;
            });

        }
    });

    return sortedObj;
}