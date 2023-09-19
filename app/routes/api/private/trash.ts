import { Router } from "express";
import { getAll, getLength } from "../../../controllers/api/private/trash";

const router = Router();

router.route("/")
    .get(getAll);

router.route("/length")
    .get(getLength);

export default router;