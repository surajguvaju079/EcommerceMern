import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "/cart/add",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "/cart/getall",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/cart/get/${userId}`
    );
    return response.data;
  }
);

export const updateCartItems = createAsyncThunk(
  "/cart/update",
  async ({ userId, productId, quantity }) => {
    console.log(userId, productId, quantity, " userId productId quantity");
    const response = await axios.put(
      "http://localhost:8000/api/shop/cart/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);
export const deleteCartItem = createAsyncThunk(
  "/cart/delete",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/shop/cart/delete/${userId}/${productId}`
    );
    return response.data;
  }
);

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default cartItemsSlice.reducer;
