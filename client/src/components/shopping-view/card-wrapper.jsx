import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CardItemsContent from "./card-items-content";
import { useNavigate } from "react-router-dom";

const UserCardItemsWrapper = ({ cartItems, setCartSheet }) => {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md bg-white">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((items) => (
              <CardItemsContent
                cartItem={items}
                key={items._id}
              ></CardItemsContent>
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setCartSheet(false);
        }}
        className="w-full mt-6 bg-blue-950 text-white hover:bg-blue-500"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCardItemsWrapper;
