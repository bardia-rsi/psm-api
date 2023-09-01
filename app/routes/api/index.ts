import { Router } from "express";
// Routes
import privateRoutes from "./privateRoutes";
import www from "./www";
import errors from "../errors";

const router = Router();

router.use("/www", www);
router.use("/data", privateRoutes);
router.use("*", errors);

export default router;