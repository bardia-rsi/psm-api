import joi from "joi";

const base = {
    question: joi.string().trim().max(256)
}

export const create: joi.ObjectSchema = joi.object({
    question: base.question.required()
});

export const update: joi.ObjectSchema = joi.object(base);