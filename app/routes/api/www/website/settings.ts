import { Router } from "express";
import { get } from "../../../../controllers/api/www/website/settings";

const router = Router();

router.route("/")
    .get(get);

export default router;