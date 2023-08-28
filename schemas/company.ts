import joi from "joi";
import { url, color } from "./common/properties";

const base = {
    name: joi.string().trim().max(128),
    website: url,
    about: joi.string().trim().max(4096).default(null),
    logo: joi.string(),
    colors: joi.object({
        logo: joi.object({
            light: color,
            dark: color
        }),
        bg: joi.object({
            light: color,
            dark: color
        })
    }).default({
        logo: { light: "#111111", dark: "#D9D9D9" },
        bg: { light: "#D9D9D9", dark: "#2B2B2B" }
    }),
    isBank: joi.boolean().default(false)
}

export const create: joi.Schema = joi.object({
    ...base,
    name: base.name.required(),
    website: base.name.required()
});

export const update: joi.ObjectSchema = joi.object(base);