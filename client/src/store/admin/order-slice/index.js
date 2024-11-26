import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  orderLists: [],
  orderDetails: null,
  isLoading: false,
};

export const getAllOrdersAdmin = createAsyncThunk(
  "/admin/allorder",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/admin/order/lists"
    );

    return response.data;
  }
);
export const getOrderDetailsAdmin = createAsyncThunk(
  "/admin/orderdetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/admin/order/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/statusupdate",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:8000/api/admin/order/update/${id}`,
      { orderStatus }
    );
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminorder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderLists = action.payload.data;
      })
      .addCase(getAllOrdersAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderLists = [];
      })
      .addCase(getOrderDetailsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default adminOrderSlice.reducer;
export const { resetOrderDetails } = adminOrderSlice.actions;
