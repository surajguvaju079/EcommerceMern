import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/add",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }) => {
    console.log(formData, "products-sliece form Data");
    const response = await axios.put(
      `http://localhost:8000/api/admin/products/edit/${id}`,
      formData
    );
    return response?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    console.log("this is delete product", id);
    const response = await axios.delete(
      `http://localhost:8000/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);
export const getAllProducts = createAsyncThunk("/products/getall", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/admin/products/getall"
  );
  return response?.data;
});

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.productList = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});
export default adminProductsSlice.reducer;
