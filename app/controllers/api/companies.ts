import type { CompanyData } from "../../../types/Data/Company";
import { crudControllers } from "../../../helpers/crudControllers";

export const {
    create,
    update,
    remove,
    get,
    getAll
} = crudControllers<CompanyData>("Company", { userId: false });