import joi from "joi";
import { BaseDataType, pid, name } from "./common/properties";

const base = {
    ...BaseDataType,
    bank: pid,
    owner: name,
    cardNumber: joi.string().trim().max(16).creditCard(),
    password: joi.string().min(4).max(8).pattern(/^\d+$/).messages({"string.pattern.base": `"Password" must only contain numbers.`}),
    cvv2: joi.string().trim().min(3).max(4).pattern(/^\d+$/).messages({"string.pattern.base": `"CVV2" must only contain numbers.`}),
    expiration: joi.string().length(7).custom((value, helpers) => {

        if (!(/^(\d{4}\/\d{2})+$/.test(value))) {
            helpers.message({ "any.custom": "The expiration date must be the following format: yyyy/mm" });
        }

        const valueArr = value.split("/").map(Number);
        const currentFullYear = new Date().getFullYear()

        if (Number(new Date(valueArr[0], valueArr[1])) < Date.now()) {
            helpers.message({ "any.custom": "The expiration date has passed." });
        }

        if (valueArr[0] < currentFullYear || valueArr[0] > currentFullYear + 10) {
            helpers.message({
                "any.custom": `The year of the expiration date must be between ` +
                    `${currentFullYear} and ${currentFullYear + 10}.`
            });
        }

        if (valueArr[1] < 1 || valueArr[1] > 12) {
            helpers.message({ "any.custom": "The month of the expiration date must be between 1 and 12." });
        }

        return value;

    })
}

export const create: joi.ObjectSchema = joi.object({
    ...base,
    owner: base.owner.required(),
    cardNumber: base.cardNumber.required(),
    cvv2: base.cvv2.required(),
    expiration: base.expiration.required()
});

export const update: joi.ObjectSchema = joi.object(base);