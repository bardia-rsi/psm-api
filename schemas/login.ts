import joi from "joi";
import { BaseDataType, pid, url, email, phoneNumber, name, address } from "./common/properties";

const securityQuestions = {
    question: joi.string().trim().max(256),
    answer: joi.string().trim().max(64)
}

const base = {
    ...BaseDataType,
    company: pid,
    url: url.max(2048),
    email,
    password: joi.string().max(2048),
    username: joi.string().lowercase().trim().max(128),
    phoneNumber,
    securityQuestions: joi.array().items(joi.object({
        question: securityQuestions.question.required(),
        answer: securityQuestions.answer.required()
    })),
    name,
    gender: joi.string().trim().max(64),
    address
}

export const create: joi.ObjectSchema = joi.object({
    ...base,
    company: base.company.required(),
    url: base.url.required(),
}).or("email", "username", "phoneNumber");

export const update: joi.ObjectSchema = joi.object({
    ...base,
    securityQuestions: joi.object({
        ...securityQuestions,
        pid: pid.required()
    })
});