import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});
