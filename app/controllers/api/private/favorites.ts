import { getAll as getAllController, getLength as getLengthController } from "./items";

export const getAll = getAllController({ favorite: { $ne: null } }, ["favorite"]);

export const getLength = getLengthController({ favorite: { $ne: null } });