import { Router } from "express";
import { get } from "../../../controllers/www/pages";

const router = Router();

router.route("/:page")
    .get(get);

export default router;