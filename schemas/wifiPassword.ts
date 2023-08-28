import joi from "joi";
import { BaseDataType } from "./common/properties";

const base = {
    ...BaseDataType,
    name: joi.string().trim().max(128).pattern(/^[a-zA-Z0-9-_\s()]+$/),
    url: joi.string().lowercase().trim().max(256).uri(),
    password: joi.string().max(256),
    routerUsername: joi.string().lowercase().trim().max(128),
    routerPassword: joi.string().max(256)
}

export const create: joi.ObjectSchema = joi.object({
    ...base,
    name: base.name.required(),
    routerUsername: base.routerUsername.default("admin"),
    routerPassword: base.routerUsername.default("admin")
});

export const update: joi.ObjectSchema = joi.object(base);