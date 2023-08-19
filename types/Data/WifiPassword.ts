import { Base, BaseDataType } from "./Bases";

interface WifiPasswordBase {
    name: string;
    password: string;
    url: string | null;
    routerUsername: string | null;
    routerPassword: string | null;
}

export interface WifiPasswordDefinition extends WifiPasswordBase, Base, BaseDataType {}