import { Router } from "express";
import settings from "./settings";
import errors from "../../../errors";

const router = Router();

router.use("/settings", settings);
router.use("*", errors);

export default router;