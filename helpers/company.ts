import type { Types } from "mongoose";
import type { CompanyData } from "../types/Data/Company";
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