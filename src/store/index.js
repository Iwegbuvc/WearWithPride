import { configureStore } from "@reduxjs/toolkit";
import { adminProductsReducer } from "./admin/products-slice";
import shoppingCartReducer from "./shop/cart-slice";

export const store = configureStore({
  reducer: {
    adminProducts: adminProductsReducer,
    shopCart: shoppingCartReducer,
  },
});
