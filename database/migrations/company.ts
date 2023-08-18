import type { CompanyDefinition } from "../../types/Data/Company";
import { Schema } from "mongoose";
import { base } from "./common/bases";

const nullOrString = (v: any): boolean => {
    return v === null || (typeof v === "string" && v.length > 0);
}

export const companySchema = new Schema<CompanyDefinition>({
    ...base,
    name: { type: String, required: true },
    website: { type: String, required: true },
    about: { type: String },
    logo: { type: String },
    colors: {
        logo: {
            light: {
                type: String,
                required: function (this: CompanyDefinition) { nullOrString(this.colors.logo.light) }
            },
            dark: {
                type: String,
                required: function (this: CompanyDefinition) { nullOrString(this.colors.logo.dark) }
            }
        },
        bg: {
            light: {
                type: String,
                required: function (this: CompanyDefinition) { nullOrString(this.colors.bg.light) }
            },
            dark: {
                type: String,
                required: function (this: CompanyDefinition) { nullOrString(this.colors.bg.dark) }
            }
        }
    },
    isBank: { type: Boolean, default: false }
});

// Indexes
companySchema.index(
    { name: 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);

companySchema.index(
    { website: 1, deletedAt: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
);