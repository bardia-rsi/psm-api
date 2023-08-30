import { Router } from "express";
import { json } from "body-parser";
import { refreshTokenValidator } from "../../../middlewares/refreshTokenValidator";
import { logoutHandler } from "../../controllers/auth/logout";

const router = Router();

router.route("/")
    .post([json(), refreshTokenValidator], logoutHandler);

export default router;