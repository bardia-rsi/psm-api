import joi from "joi";
import { pid, email, phoneNumber, name, dateOfBirth, password } from "./common/properties";

const securityQuestions = {
    question: pid,
    answer: joi.string().trim().max(64)
}

const base = {
    login: {
        username: joi.string().lowercase().trim().max(64).pattern(/^[A-Za-z0-9-_.]+$/).messages({"string.pattern.base": `"Username" must be alphanumeric and only (._-) characters are allowed.`}),
        email,
        phoneNumber,
        password: joi.object({
            current: {
                content: password.required(),
            },
            repeated: joi.string().required().strip().valid(joi.ref("current.content"))
        }),
        securityQuestions: joi.array().items(joi.object({
            question: securityQuestions.question.required(),
            answer: securityQuestions.answer.required()
        })).length(3)
    },
    personalInfo: joi.object({
        name,
        dateOfBirth,
        gender: joi.string().lowercase().trim().allow("male", "female", "non-binary", "other", "prefer not to say", null),
    }),
    address: joi.object({
        country: joi.string().trim().max(128),
        state: joi.string().trim().max(128),
        city: joi.string().trim().max(128),
        street: joi.string().trim().max(128),
        postalCode: joi.string().trim().max(16),
    }),
    security: joi.object({
        twoStepVerification: joi.boolean()
    })
}

export const signUp: joi.ObjectSchema = joi.object({
    ...base,
    login: joi.object({
        ...base.login,
        username: base.login.username.required(),
        email: base.login.email.required(),
        password: base.login.password.required()
    })
});

export const login: joi.ObjectSchema = joi.object({
    username: base.login.username,
    email,
    phoneNumber: phoneNumber,
    password: password
}).xor("username", "email", "phoneNumber");

export const update: joi.ObjectSchema = joi.object({
    ...base,
    login: joi.object({
        ...base.login,
        securityQuestions: joi.array().items(joi.object({
            ...securityQuestions,
            pid
        })).length(3)
    })
});