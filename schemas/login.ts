import joi from "joi";
import { BaseDataType, pid, url, email, phoneNumber } from "./common/properties";

const base = {
    ...BaseDataType,
    company: pid,
    url: url.max(2048),
    email,
    password: joi.string().max(2048),
    username: joi.string().lowercase().trim().max(128),
    phoneNumber
}

export const create: joi.ObjectSchema = joi.object({
    ...base,
    company: base.company.required(),
    url: base.url.required(),
}).or("email", "username", "phoneNumber");

export const update: joi.ObjectSchema = joi.object(base);