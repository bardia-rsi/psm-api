import { Base } from "./Bases";

interface CompanyBase {
    name: string;
    website: string;
    about: string;
    logo: string;
    colors: {
        logo: {
            dark: string | null;
            light: string | null;
        },
        bg: {
            dark: string | null;
            light: string | null;
        }
    };
    isBank: boolean;
}

export interface CompanyDefinition extends CompanyBase, Base {}