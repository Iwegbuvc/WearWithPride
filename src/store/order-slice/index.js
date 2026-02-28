import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    // Fetch all orders by setting a high limit
    const response = await API.get(`/admin/orders?limit=1000`);
    return response.data;
  }
);

// You need to add a backend route for this if you want to fetch a single order by ID
// You do not have a backend route for GET /api/admin/orders/:id in your admin router.
// If you want to fetch a single order by ID for admin, you must add this route to your backend.
// For now, this thunk will not work unless you add that route.

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await API.patch(`/admin/orders/${id}/status`, {
      status: orderStatus,
    });
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      // console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.orders;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      // Removed getOrderDetailsForAdmin cases because the thunk is not defined
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
