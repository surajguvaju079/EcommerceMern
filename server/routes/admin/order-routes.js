import express from "express";
import {
  getAllOrdersAdmin,
  getOrderDetailsAdmin,
  updateOrderStatus,
} from "../../controller/admin/order-controller.js";

const router = express.Router();

router.get("/lists/", getAllOrdersAdmin);
router.get("/details/:id", getOrderDetailsAdmin);
router.put("/update/:id", updateOrderStatus);
export default router;
