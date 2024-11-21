import { IForm, IMenuItem } from "../../types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createMenuItems,
  deleteOneMenuItem,
  editMenuItem,
  fetchAllMenuItems,
  getOneMenuItemById,
} from "../thunks/pizzaThunk.ts";
import { RootState } from "../../app/store.ts";

interface MenuItemState {
  isAddLoading: boolean;
  menuItems: IMenuItem[];
  isFetchLoading: boolean;
  isDeleteLoading: boolean;
  oneMenuItem: IForm | null;
  isFetchOneMenuItemLoading: boolean;
  isEditLoading: boolean;
}

const initialState: MenuItemState = {
  isAddLoading: false,
  menuItems: [],
  isFetchLoading: true,
  oneMenuItem: null,
  isFetchOneMenuItemLoading: false,
  isDeleteLoading: false,
  isEditLoading: false,
};
export const selectAddLoading = (state: RootState) =>
  state.menuItems.isAddLoading;

export const selectFetchLoading = (state: RootState) =>
  state.menuItems.isFetchLoading;
export const selectMenuItems = (state: RootState) => state.menuItems.menuItems;
export const selectDeleteLoading = (state: RootState) =>
  state.menuItems.isDeleteLoading;
export const selectEditLoading = (state: RootState) =>
  state.menuItems.isEditLoading;
export const selectFetchOneMenuItemLoading = (state: RootState) =>
  state.menuItems.isFetchOneMenuItemLoading;
export const selectOneMenuItem = (state: RootState) =>
  state.menuItems.oneMenuItem;

export const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenuItems.pending, (state) => {
        state.isAddLoading = true;
      })
      .addCase(createMenuItems.fulfilled, (state) => {
        state.isAddLoading = false;
      })
      .addCase(createMenuItems.rejected, (state) => {
        state.isAddLoading = false;
      })
      .addCase(fetchAllMenuItems.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(
        fetchAllMenuItems.fulfilled,
        (state, action: PayloadAction<IMenuItem[]>) => {
          state.isFetchLoading = false;
          console.log(action.payload);
          state.menuItems = action.payload;
        },
      )
      .addCase(fetchAllMenuItems.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteOneMenuItem.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteOneMenuItem.fulfilled, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOneMenuItem.rejected, (state) => {
        state.isDeleteLoading = false;
      })

      .addCase(getOneMenuItemById.pending, (state) => {
        state.isFetchOneMenuItemLoading = true;
      })
      .addCase(
        getOneMenuItemById.fulfilled,
        (state, action: PayloadAction<IForm | null>) => {
          state.isFetchOneMenuItemLoading = false;
          state.oneMenuItem = action.payload;
        },
      )
      .addCase(getOneMenuItemById.rejected, (state) => {
        state.isFetchOneMenuItemLoading = false;
      })
      .addCase(editMenuItem.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editMenuItem.fulfilled, (state) => {
        state.isEditLoading = false;
        state.oneMenuItem = null;
      })
      .addCase(editMenuItem.rejected, (state) => {
        state.isEditLoading = false;
      });
  },
});

export const menuItemsReducer = menuItemsSlice.reducer;
