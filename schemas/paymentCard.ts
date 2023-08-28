import joi from "joi";
import { BaseDataType, pid, name } from "./common/properties";

const base = {
    ...BaseDataType,
    bank: pid,
    owner: name,
    cardNumber: joi.string().trim().max(16).creditCard(),
    password: joi.string().min(4).max(8).pattern(/^\d+$/).messages({"string.pattern.base": `"Password" must only contain numbers.`}),
    cvv2: joi.string().trim().min(3).max(4).pattern(/^\d+$/).messages({"string.pattern.base": `"CVV2" must only contain numbers.`}),
    expiration: joi.date().greater("now").timestamp("javascript")
}

export const create: joi.ObjectSchema = joi.object({
    ...base,
    bank: base.bank.required(),
    owner: base.owner.required(),
    cardNumber: base.cardNumber.required()
});

export const update: joi.ObjectSchema = joi.object(base);