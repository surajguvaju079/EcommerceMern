import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { deleteCartItem, updateCartItems } from "@/store/shop-slice/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const CardItemsContent = ({ cartItem, key }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleCartItemsDelete = (cartItem) => {
    dispatch(deleteCartItem({ userId: user.id, productId: cartItem.productId }))
      .then((data) => {
        console.log(data);
        toast({
          title: "Cart items deleted successfully",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateQuantity = (cartItem, typeOfAction) => {
    dispatch(
      updateCartItems({
        userId: user.id,
        productId: cartItem.productId,
        quantity:
          typeOfAction === "plus"
            ? cartItem.quantity + 1
            : cartItem.quantity - 1,
      })
    )
      .then((data) => {
        console.log(data);
        toast({
          title: "Cart quantity updated successfully",
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex items-center space-x-4" key={key}>
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          {(cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) *
            cartItem?.quantity.toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemsDelete(cartItem)}
          className="cursor-pointer mt-1 size={20}"
        />
      </div>
    </div>
  );
};

export default CardItemsContent;
