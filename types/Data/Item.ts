import type * as Contact from "./Contact";
import type * as Login from "./Login";
import type * as PaymentCard from "./PaymentCard";
import type * as WifiPassword from "./WifiPassword";

export type ItemData =
    Contact.ContactData & { type: "contact" } |
    Login.LoginData & { type: "login" } |
    PaymentCard.PaymentCardData & { type: "paymentCard" } |
    WifiPassword.WifiPasswordData & { type: "wifiPassword" };