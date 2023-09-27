import { Router } from "express";
import { json } from "body-parser";
import { refreshTokenValidator } from "../../../middlewares/refreshTokenValidator";
import { checkPassword } from "../../controllers/auth/password";

const router = Router();

router.use([refreshTokenValidator]);

router.route("/check")
    .post(json(), checkPassword);

export default router;