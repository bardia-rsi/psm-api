import { Router } from "express";
import login from "./login";
import logout from "./logout";
import signUp from "./signUp";
import token from "./token";
import password from "./password";
import errors from "../errors";

const router = Router();

router.use("/login", login);
router.use("/logout", logout);
router.use("/sign-up", signUp);
router.use("/token", token);
router.use("/password", password);
router.use("*", errors);

export default router;