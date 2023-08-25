import type { QuestionData } from "../../../types/Data/Question";
import { crudControllers } from "../../../helpers/crudControllers";

export const {
    create,
    update,
    remove,
    get,
    getAll
} = crudControllers<QuestionData>("Question", { userId: false });