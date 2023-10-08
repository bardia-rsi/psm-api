import joi from "joi";
import { BaseDataType, url, email, phoneNumber } from "./common/properties";

const base = {
    ...BaseDataType,
    url: url.max(2048),
    email,
    password: joi.string().max(2048),
    username: joi.string().lowercase().trim().max(128),
    phoneNumber
}

export const create: joi.ObjectSchema = joi.object({
    ...base,
    url: base.url.required(),
}).or("email", "username", "phoneNumber");

export const update: joi.ObjectSchema = joi.object(base);