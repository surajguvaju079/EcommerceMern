import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "/shop/address/add",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/address/add",
      formData
    );
    return response.data;
  }
);
export const fetchAllAddress = createAsyncThunk(
  "/shop/address/getall",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);
export const editAddress = createAsyncThunk(
  "/shop/address/edit",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:8000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "/shop/address/delete",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchAllAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
