import type { ContactData } from "../../../../types/Data/Contact";
import { crudControllers } from "../../../../helpers/crudControllers";

export const { create, update, remove, get, getAll, getLength } = crudControllers<ContactData>("Contact");