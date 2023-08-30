import { Router } from "express";
import { json } from "body-parser";
import { userDataValidator } from "../../../middlewares/userDataValidator";
import { loginHandler } from "../../controllers/auth/login";

const router = Router();

router.route("/")
    .post([json(), userDataValidator], loginHandler);

export default router;