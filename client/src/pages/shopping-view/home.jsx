import React, { useEffect } from "react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ComputerIcon,
  JapaneseYenIcon,
  Lamp,
  ScanFace,
  ShirtIcon,
  Shovel,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllShopProducts, getProductDetails } from "@/store/shop-slice";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop-slice/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/productDetailsDialog";
const categoriesWithOptions = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandWithOptions = [
  { id: "nike", label: "Nike", icon: ScanFace },
  { id: "adidas", label: "Adidas", icon: ComputerIcon },
  { id: "puma", label: "Puma", icon: Shovel },
  { id: "levi", label: "Zara", icon: TwitterLogoIcon },
  { id: "h&m", label: "H&M", icon: JapaneseYenIcon },
  { id: "zara", label: "Zara", icon: Lamp },
];

const ShoppingHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { listProducts, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree];

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1 + slides.length) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      getAllShopProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);
  console.log(listProducts, "list products from home");

  const handleNavigateToListing = (getItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/list");
  };
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
  const productDetailsHandler = (id) => {
    console.log(id, "product Details handler");
    dispatch(getProductDetails(id))
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (productDetails !== null) setOpenDialogBox(true);
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } w-full h-full object-cover transition-opacity duration-1000 absolute top-0 left-0`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-center mb-8">Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithOptions.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigateToListing(item, "category")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-center mb-8">Shop by brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithOptions.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigateToListing(item, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {listProducts && listProducts.length > 0
              ? listProducts.map((item) => (
                  <ShoppingProductTile
                    product={item}
                    productDetailsHandler={productDetailsHandler}
                    handleAddtoCart={handleAddtoCart}
                    key={item._id}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <div>
        <ProductDetailsDialog
          open={openDialogBox}
          setOpen={setOpenDialogBox}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
};

export default ShoppingHome;
