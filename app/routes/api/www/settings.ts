import { Router } from "express";
import { get } from "../../../controllers/www/settings";

const router = Router();

router.route("/")
    .get(get);

export default router;