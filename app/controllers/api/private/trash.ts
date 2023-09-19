import { getAll as getAllController, getLength as getLengthController } from "./items";

export const getAll = getAllController({ trash: { $ne: null } }, ["trash"]);

export const getLength = getLengthController({ trash: { $ne: null } });