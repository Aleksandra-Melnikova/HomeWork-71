import { configureStore } from "@reduxjs/toolkit";
import { menuItemsReducer, } from '../store/slices/menuItemsSlice.ts';


export const store = configureStore({
  reducer: {
    menuItems: menuItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
