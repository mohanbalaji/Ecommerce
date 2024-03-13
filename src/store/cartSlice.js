// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsNumber: 0,
  // Add other cart properties as needed
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add reducer functions as needed
  },
});

export const { /* Add action creators */ } = cartSlice.actions;

export default cartSlice.reducer;
