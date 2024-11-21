import { configureStore } from "@reduxjs/toolkit";
import { menuItemsReducer } from "../store/slices/menuItemsSlice.ts";
import { cartReducer } from "../store/slices/cardSlice.ts";

export const store = configureStore({
  reducer: {
    menuItems: menuItemsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
