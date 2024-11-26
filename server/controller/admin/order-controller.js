import { Order } from "../../model/Order.js";

export const getAllOrdersAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await Order.find({});
    if (!order) {
      return res.status(401).json("Order not found for this user");
    }
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};
export const getOrderDetailsAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(401).json("Order not found ");
    }
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(401).json("Order not found ");
    }
    await Order.findByIdAndUpdate(id, { orderStatus });
    res
      .status(201)
      .json({ success: true, message: "status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};
