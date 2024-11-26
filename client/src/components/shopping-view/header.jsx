import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SheetTrigger, Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logOutUser } from "@/store/auth-slice";
import UserCardItemsWrapper from "./card-wrapper";
import { useState } from "react";
import { fetchCartItems } from "@/store/shop-slice/cart-slice";
import { Label } from "../ui/label";
const MenuItems = () => {
  const navigate = useNavigate();
  const handleNavigate = (getItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getItem.id !== "home"
        ? {
            category: [getItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getItem.path);
  };
  return (
    <nav className="flex flex-col lg:flex-row lg:items-center  gap-6 lg:mb-0 mb-3">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Label
          className="text-sm font-medium cursor-pointer"
          key={item.id}
          onClick={() => handleNavigate(item)}
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setCartSheet] = useState(false);
  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  useEffect(() => {
    dispatch(fetchCartItems(user.id))
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [dispatch]);
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setCartSheet}>
        <Button
          onClick={() => {
            setCartSheet(true);
          }}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="w-6 h-6" />
        </Button>
        <UserCardItemsWrapper
          setCartSheet={setCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-white">
          <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="px-1 py-2 hover:bg-blue-700"
          >
            <UserCog className="mr-2 h-4 w-4 " />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="px-1 py-2 hover:bg-blue-300"
            onClick={handleLogOut}
          >
            <LogOut className="mr-2 h-4 w-4 " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  //  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 bg-background border-b w-full z-40">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="lg:block hidden">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
