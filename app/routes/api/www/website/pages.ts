import { Router } from "express";
import { get } from "../../../../controllers/api/www/website/pages";

const router = Router();

router.route("/:page")
    .get(get);

export default router;