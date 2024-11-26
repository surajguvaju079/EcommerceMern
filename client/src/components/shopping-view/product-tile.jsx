import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { categoryOptionsMap, brandOptionsMap } from "@/config";
const ShoppingProductTile = ({
  product,
  productDetailsHandler,
  handleAddtoCart,
}) => {
  return (
    <Card className="w-full max-w-sm max-auto mx-2 px-2 pt-2">
      <div onClick={() => productDetailsHandler(product._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 h-[20px] bg-red-500 rounded-full hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground text-slate-600">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground text-slate-600">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddtoCart(product?._id)}
          className="w-full bg-background bg-gray-700 text-white hover:outline-dashed hover:text-black"
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
