import { Router } from "express";
// Middlewares
import { accessTokenValidator } from "../../../middlewares/accessTokenValidator";
import { refreshTokenValidator } from "../../../middlewares/refreshTokenValidator";
// Routes
import companies from "./companies";
import contacts from "./contacts";
import logins from "./logins";
import paymentCards from "./paymentCards";
import questions from "./questions";
import user from "./users";
import wifiPasswords from "./wifiPasswords";
import errors from "../errors";

const router = Router();

router.use([accessTokenValidator, refreshTokenValidator]);

router.use("/companies", companies);
router.use("/contacts", contacts);
router.use("/logins", logins);
router.use("/payment-cards", paymentCards);
router.use("/questions", questions);
router.use("/user", user);
router.use("/wifi-passwords", wifiPasswords);
router.use("*", errors);

export default router;