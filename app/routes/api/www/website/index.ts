import { Router } from "express";
import settings from "./settings";
import pages from "./pages";
import errors from "../../../errors";

const router = Router();

router.use("/settings", settings);
router.use("/pages", pages);
router.use("*", errors);

export default router;