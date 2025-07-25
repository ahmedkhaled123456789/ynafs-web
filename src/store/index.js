import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
const store = configureStore({
  devTools: import.meta.env.DEV,
  reducer: {
    category: categoriesReducer,
  },
});

export default store;
