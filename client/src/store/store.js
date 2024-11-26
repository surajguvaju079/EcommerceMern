import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductsReducer from "./admin/products-slice/product-slice.js";
import shopProductsReducer from "./shop-slice/index.js";
import cartItemsReducer from "./shop-slice/cart-slice/index.js";
import addressSliceReducer from "./shop-slice/address-slice/index.js";
import shopOrderReducer from "./shop-slice/order-slice/index.js";
import adminOrderReducer from "./admin/order-slice/index.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shopProductsReducer,
    cartItems: cartItemsReducer,
    address: addressSliceReducer,
    order: shopOrderReducer,
    adminorder: adminOrderReducer,
  },
});
