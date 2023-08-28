import joi from "joi";
import { BaseDataType, phoneNumber, email, address, url } from "./common/properties";

const base = {
    ...BaseDataType,
    name: joi.string().trim().max(128),
    work: joi.string().trim().max(128),
    phoneNumber,
    email,
    address,
    website: url,
}

export const create: joi.ObjectSchema = joi.object({
    ...base,
    name: base.name.required(),
    phoneNumber: base.phoneNumber.required()
});

export const update: joi.ObjectSchema = joi.object(base);