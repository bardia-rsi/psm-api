import { Router } from "express";
import { json } from "body-parser";
import { bodyValidator } from "../../../middlewares/bodyValidator";
import { create, update, remove, get, getAll, getLength } from "../../controllers/api/contacts";

const router = Router();

router.route("/")
    .get(getAll)
    .post([json(), bodyValidator], create);

router.route("/length")
    .get(getLength);

router.route("/:id")
    .get(get)
    .put([json(), bodyValidator], update)
    .delete(remove);

export default router;