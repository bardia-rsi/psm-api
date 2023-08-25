import type { WifiPasswordData } from "../../../types/Data/WifiPassword";
import { crudControllers } from "../../../helpers/crudControllers";

export const { create, update, remove, get, getAll, getLength } = crudControllers<WifiPasswordData>("WifiPassword");