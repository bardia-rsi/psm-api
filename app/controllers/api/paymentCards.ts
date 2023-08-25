import type { PaymentCardData } from "../../../types/Data/PaymentCard";
import { crudControllers } from "../../../helpers/crudControllers";

export const { create, update, remove, get, getAll, getLength } = crudControllers<PaymentCardData>("PaymentCard");