import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setOrders, setError } = ordersSlice.actions;

export default ordersSlice.reducer;
