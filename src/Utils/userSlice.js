import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: true,
    error: null
  },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
     addToCart: (state, action) => {
      const item = state.items.find(
        i => i.name === action.payload.name
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    }
  }
});

export const { addUser, logoutUser,addToCart } = userSlice.actions;
export default userSlice.reducer;
