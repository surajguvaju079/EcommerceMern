import { Card, CardHeader } from "@/components/ui/card";
import { capturePayment } from "@/store/shop-slice/order-slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturn = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  console.log(params);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  console.log(paymentId, " ", payerId);

  console.log("location search", location.search);

  useEffect(() => {
    if (payerId && paymentId) {
      const orderId = JSON.parse(sessionStorage.getItem("CurrentOrderId"));
      console.log("orderId:", orderId);
      dispatch(capturePayment({ payerId, paymentId, orderId }))
        .then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            sessionStorage.removeItem("CurrentOrderId");
            window.location.href = "/shop/payment-success";
          }
        })
        .catch((error) => console.log(error));
    }
  }, [payerId, paymentId, dispatch]);

  return (
    <Card>
      <CardHeader>Payment is processing ....</CardHeader>
    </Card>
  );
};

export default PaypalReturn;
