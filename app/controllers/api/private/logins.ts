import type { LoginData } from "../../../../types/Data/Login";
import { crudControllers } from "../../../../helpers/crudControllers";

export const { create, update, remove, get, getAll, getLength } = crudControllers<LoginData>("Login");