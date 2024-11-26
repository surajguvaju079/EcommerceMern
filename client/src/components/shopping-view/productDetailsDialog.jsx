import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop-slice/cart-slice";
import { toast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop-slice/index";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleAddtoCart = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    )
      .then((data) => {
        console.log(data, "toast data");
        console.log("toast is acceptable", data?.payload?.success);
        if (data?.payload?.success) {
          toast({
            title: "Product added to cart to successfully.",
            variant: "primary",
          });
          dispatch(fetchCartItems(user?.id))
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
          console.log("hi");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 rounded-[80px] bg-white gap-8 sm:p-12 max-w-[90vw] lg:w-[70vw] sm:w-[80vw]">
        <div className="relative overflow-hidden rounded-lg ">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            height="600"
            width="600"
            className="aspect-square w-full object-cover"
          ></img>
        </div>
        <div className="">
          <div>
            <DialogTitle className="text-3xl font-extrabold">
              {productDetails?.title}
            </DialogTitle>
            <p className="text-muted-foreground text-2xl mb-5 mt-4 ">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl  ${
                productDetails?.salePrice > 0 ? "line-through" : null
              } `}
            >
              {productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <div className="text-2xl font-bold text-muted-foreground">
                <p>{productDetails?.salePrice}</p>
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarIcon fill="black w-4" />
              <StarIcon fill="black w-4" />
              <StarIcon fill="black w-4" />
              <StarIcon fill="black w-4" />
              <StarIcon fill="black w-4" />
            </div>
            <span className="text-">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              onClick={() => handleAddtoCart(productDetails._id)}
              className="bg-blue-950 text-white hover:outline w-full hover:text-black hover:bg-blue-400"
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid grid-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Suraj Guvaju</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Suraj Guvaju</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Suraj Guvaju</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Suraj Guvaju</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                    <StarIcon fill="black w-4" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="Write a review..." />
              <Button className="bg-blue-950 hover:outline-lime-50 hover:text-black text-white">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
