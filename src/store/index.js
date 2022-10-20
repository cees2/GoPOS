import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import productsSlice from "./productsSlice";

const store = configureStore({
  reducer: { categories: categoriesSlice, products: productsSlice },
});

export default store;
