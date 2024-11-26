import React, { useState } from "react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import CommonForm from "../common/form";
import {
  getAllOrdersAdmin,
  getOrderDetailsAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
const initialFormData = {
  status: "",
};

const ShoppingOrderDetails = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleStatusSubmit = (event) => {
    event.preventDefault();
    const { status } = formData;
    console.log(status);

    dispatch(
      updateOrderStatus({
        id: orderDetails._id,
        orderStatus: status,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsAdmin(orderDetails._id));
        dispatch(getAllOrdersAdmin());
        setFormData(initialFormData);
      }
    });
  };

  return (
    <DialogContent className="bg-white  max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Id</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={` ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-700"
                    : "bg-black"
                } py-2 w-full text-muted-foreground grid place-content-center  text-white`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order</div>
            <ul className="grid gap-3">
              {orderDetails &&
              orderDetails?.cartItems &&
              orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>{item.title}</span>
                      <span>{item.quantity}</span>
                      <span>${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.username}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Status"}
            onSubmit={(event) => handleStatusSubmit(event)}
            formControl={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShopping", label: "In Shipping" },
                  { id: "rejected", label: "Rejected" },
                  { id: "delivered", label: "Delevered" },
                ],
              },
            ]}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetails;
