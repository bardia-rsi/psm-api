import { Router } from "express";
import { json } from "body-parser";
import { refreshTokenValidator } from "../../../middlewares/refreshTokenValidator";
import { tokenHandler } from "../../controllers/auth/token";

const router = Router();

router.route("/")
    .post([json(), refreshTokenValidator], tokenHandler);

export default router;