import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },

    logoutUser: (state) => {
      state.data = null;
      state.cart = [];
      state.loading = false;
      state.error = null;
    },

    addToCart: (state, action) => {
      // backend returns full cart
      state.cart = action.payload;
    },
  },
});

export const { addUser, logoutUser, addToCart } = userSlice.actions;
export default userSlice.reducer;
