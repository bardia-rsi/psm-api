import { Router } from "express";
import files from "./files";
import errors from "../errors";

const router = Router();

router.use("/", files);
router.use("*", errors);

export default router;