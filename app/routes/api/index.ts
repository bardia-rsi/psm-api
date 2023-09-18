import { Router } from "express";
// Routes
import privateRoutes from "./private";
import www from "./www/website";
import errors from "../errors";

const router = Router();

router.use("/www", www);
router.use("/data", privateRoutes);
router.use("*", errors);

export default router;