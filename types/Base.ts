export type StringMap = {
    [key: string]: any;
}

export type DictionaryUnion<K extends string | number | symbol, T = any> = {
    [key in K]: T;
}