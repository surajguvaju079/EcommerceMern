import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  listProducts: [],
  productDetails: null,
};
export const getAllShopProducts = createAsyncThunk(
  "/shop/allproducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const response = await axios.get(
      `http://localhost:8000/api/shop/products/getall?${query}`
    );
    return response.data;
  }
);
export const getProductDetails = createAsyncThunk(
  "/shop/productDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/products/get/${id}`
    );
    return response.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllShopProducts.pending, (state, action) => {
        state.isLoading = true;
        state.listProducts = null;
      })
      .addCase(getAllShopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.listProducts = action.payload.data;
      })
      .addCase(getAllShopProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.listProducts = null;
      });
    builder
      .addCase(getProductDetails.pending, (state, action) => {
        state.isLoading = true;
        state.productDetails = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shopProductSlice.reducer;
export const { setProductDetails } = shopProductSlice.actions;
