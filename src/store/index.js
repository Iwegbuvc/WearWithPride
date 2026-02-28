import { configureStore } from "@reduxjs/toolkit";

import { adminProductsReducer } from "./admin/products-slice";

import shoppingCartReducer from "./shop/cart-slice";
import adminOrderReducer from "./order-slice";
import shoppingOrderReducer from "./shop/order-slice";

export const store = configureStore({
  reducer: {
    adminProducts: adminProductsReducer,
    shopCart: shoppingCartReducer,
    adminOrderSlice: adminOrderReducer,
    shoppingOrderSlice: shoppingOrderReducer,
  },
});
