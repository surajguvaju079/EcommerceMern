import React from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import CardItemsContent from "@/components/shopping-view/card-items-content";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createShoppingOrder } from "@/store/shop-slice/order-slice";
import { toast } from "@/hooks/use-toast";
const ShoppingCheckout = () => {
  const { approvedURL } = useSelector((state) => state.order);
  const [isPaymentStarted, setIsPaymentStarted] = useState();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cartItems);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const totalCartAmount =
    cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;

  const handleInitiatePaypal = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart Items are empty",
        varian: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Address is not selected",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems._id,
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item.salePrice : item.price,
        quantity: item?.quantity,
      })),
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createShoppingOrder(orderData))
      .then((data) => {
        if (data?.payload?.success) {
          setIsPaymentStarted(true);
        } else {
          setIsPaymentStarted(false);
        }
        console.log(data);
      })
      .catch((error) => console.log(error));
    console.log(orderData);
  };

  if (approvedURL) {
    window.location.href = approvedURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col px-4 gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CardItemsContent cartItem={item} key={item.productId} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="px-4 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaypal}
              className="w-full bg-blue-950 text-white hover:bg-blue-900"
            >
              Checkout With Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
