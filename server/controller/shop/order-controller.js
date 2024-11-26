import paypal from "../../helper/paypal.js";
import { Order } from "../../model/Order.js";
import { Cart } from "../../model/cart.js";
export const createOrder = async (req, res) => {
  try {
    console.log("create order is working");
    const {
      userId,
      addressInfo,
      cartItems,
      orderStatus,
      paymentMethod,
      paymentStatus,
      cartId,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          descrioption: "This is the payment description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        res.status(401).json({
          sucess: false,
          message: "Error occuredd while creating payment",
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          addressInfo,
          cartItems,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newlyCreatedOrder.save();

        const approvedURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        res
          .status(200)
          .json({ success: true, approvedURL, orderId: newlyCreatedOrder._id });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    const getCartId = order.cartId;
    console.log("get cart id", getCartId);
    await Cart.findByIdAndDelete(getCartId);
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await Order.find({ userId });
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
export const getOrderDetails = async (req, res) => {
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
