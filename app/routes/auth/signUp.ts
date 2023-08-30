import { Router } from "express";
import { json } from "body-parser";
import { userDataValidator } from "../../../middlewares/userDataValidator";
import { signUpHandler } from "../../controllers/auth/signUp";

const router = Router();

router.route("/")
    .post([json(), userDataValidator], signUpHandler);

export default router;