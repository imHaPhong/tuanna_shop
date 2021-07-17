import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import libaryReducer from "../features/libary/index";
import playerReducer from "../features/player/index";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    libary: libaryReducer,
    player: playerReducer,
  },
});
