import { Router } from "express";
import { get } from "../../../../controllers/api/www/dashboard/settings";

const router = Router();

router.route("/")
    .get(get);

export default router;