import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
const store = configureStore({
  reducer: {
    category: categoriesReducer,
  },
});

export default store;
