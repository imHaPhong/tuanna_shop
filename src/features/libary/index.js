import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

export const libarySlice = createSlice({
  name: "libarySlide",
  initialState,
  reducers: {
    libaryToggle: (state, action) => {
      state.active = !state.active;
    },
  },
});

const { reducer, actions } = libarySlice;
export const { libaryToggle } = actions;
export default reducer;
