import type { Types } from "mongoose";
import type { CompanyData } from "../types/Data/Company";
import creditCardType from "credit-card-type";
import { iranianBankDetector } from "./creditCardDetector";
import { find, create, _id } from "../app/models/Company";

export const getObjectIdByUrl = async (url: string, isBank: boolean): Promise<Types.ObjectId | null> => {

    const { hostname, origin } = new URL(url);
    let company: CompanyData | undefined = (await find({ website: { $regex: hostname, $options: "i" } }))[0];

    if (!company) {
        company = await create({
            website: origin,
            name: hostname,
            about: "",
            logo: "",
            colors: {
                logo: { light: "#111111", dark: "#D9D9D9" },
                bg: { light: "#D9D9D9", dark: "#2B2B2B" }
            },
            isBank
        });
    }

    return company ? await _id(company.pid) : null;

}

export const getObjectIdByCardNumber = async (cardNumber: string): Promise<Types.ObjectId | null> => {

    const bankName: string | undefined = iranianBankDetector(cardNumber.slice(0, 6)) ??
        creditCardType(cardNumber)[0].type;

    console.log(bankName);

    const bank: CompanyData | undefined = (await find({ name: { $regex: `^${bankName}$`, $options: "i" } }))[0];
    console.log(bank);
    return bank ? await _id(bank.pid) : null;

}