import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";

dotenv.config();

const client_id = process.env.PAYPAL_CLIENT_ID;
const client_secret = process.env.PAYPAL_CLIENT_SECRET;
paypal.configure({
  mode: "sandbox",
  client_id: client_id,
  client_secret: client_secret,
});

export default paypal;
