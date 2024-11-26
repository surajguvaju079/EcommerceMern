import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvedURL: null,
  isLoading: false,
  orderId: null,
  orderLists: [],
  orderDetails: null,
};

export const createShoppingOrder = createAsyncThunk(
  "/shop/order/create",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/order/create",
      orderData
    );

    return response.data;
  }
);
export const capturePayment = createAsyncThunk(
  "/shop/order/capturepayment",
  async ({ payerId, paymentId, orderId }) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/order/capture",
      {
        orderId,
        paymentId,
        payerId,
      }
    );

    return response.data;
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/order/list",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/order/lists/${userId}`
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/details",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/order/details/${id}`
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShoppingOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShoppingOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvedURL = action.payload.approvedURL;
        state.orderId = action.payload.orderId;
        console.log(action.payload);
        sessionStorage.setItem(
          "CurrentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createShoppingOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvedURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderLists = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderLists = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
