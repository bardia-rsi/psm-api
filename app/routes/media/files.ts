import { Router } from "express";
import { fileHandler } from "../../controllers/media/files";

const router = Router();


router.route("/:dir/:fileName")
    .get(fileHandler);

export default router;