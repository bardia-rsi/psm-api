import { Router } from "express";
import website from "./website";
import dashboard from "./dashboard";
import errors from "../../errors";

const router = Router();

router.use("/website", website);
router.use("/dashboard", dashboard);
router.use("*", errors);

export default router;