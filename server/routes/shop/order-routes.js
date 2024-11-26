import express from "express";
import {
  capturePayment,
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../controller/shop/order-controller.js";

const router = express.Router();

router.post("/create", createOrder);

router.post("/capture", capturePayment);
router.get("/lists/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);
export default router;
