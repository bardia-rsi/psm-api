export const isObject = (v: any): boolean => Object.prototype.toString.call(v) === "[object Object]";

export const sortByKeys = (obj: Record<string, any>) => {

    const sortedObj: Record<string, any> = {};

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

export const keysPath = (obj: Record<string, any>, prefix: string = ""): string[] => {
    return Object.keys(obj).reduce((paths: string[], key: string): string[] => {

        if (isObject(obj[key])) {
            return [...paths, ...keysPath(obj[key], prefix + key + ".")]
        }

        paths.push(prefix + key);

        return paths;

    }, []);
}