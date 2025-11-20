// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  discount: 0       
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addItem(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      state.total += item.price * item.quantity;
    },
    removeItem(state, action) {
      const id = action.payload;
      const index = state.items.findIndex(i => i.id === id);
      if (index !== -1) {
        state.total -= state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        state.total -= item.price * item.quantity;
        item.quantity = quantity;
        state.total += item.price * quantity;
      }
    },
    applyDiscount(state, action) {
      state.discount = action.payload;
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.discount = 0;
    }
  }
});

export const { setCart, addItem, removeItem, updateQuantity, applyDiscount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
