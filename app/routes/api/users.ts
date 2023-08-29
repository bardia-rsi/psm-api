import { Router } from "express";
import { json } from "body-parser";
import { bodyValidator } from "../../../middlewares/bodyValidator";
import { get, update, remove } from "../../controllers/api/users";

const router = Router();

router.route("/")
    .get(get)
    .put([json(), bodyValidator], update)
    .delete(remove);

export default router;