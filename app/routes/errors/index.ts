import { Router } from "express";
import { err404Handler } from "../../controllers/errors/404";
import { err405Handler } from "../../controllers/errors/405";

const router = Router();

router.route("*")
    .get(err404Handler)
    .all(err405Handler);

export default router;