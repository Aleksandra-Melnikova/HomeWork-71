import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IForm,
  IMenuItem,
  IMenuItemList,
  IOrder,
  IOrdersFromApi,
} from "../../types";
import axiosApi from "../../axiosAPI.ts";

export const fetchAllMenuItems = createAsyncThunk<IMenuItem[], void>(
  "menuItems/fetchAllMenuItems",
  async () => {
    const response: { data: IMenuItemList | null } =
      await axiosApi("menuItems.json");
    const menuItemsList = response.data;
    if (menuItemsList === null) {
      return [];
    }
    const menuItems: IMenuItemList = menuItemsList;

    return Object.keys(menuItemsList).map((dish) => {
      return {
        ...menuItems[dish],
        id: dish,
      };
    });
  },
);

export const deleteOneMenuItem = createAsyncThunk<void, string>(
  "menuItems/deleteOneMenuItem",
  async (dishId: string) => {
    await axiosApi.delete(`menuItems/${dishId}.json`);
  },
);

export const createMenuItems = createAsyncThunk<void, IForm>(
  "menuItems/createMenuItems ",
  async (form) => {
    await axiosApi.post("menuItems.json", { ...form });
  },
);

export const getOneMenuItemById = createAsyncThunk<IForm | null, string>(
  "menuItems/getOneMenuItemByI",
  async (dishId) => {
    const response = await axiosApi<IMenuItem | null>(
      `menuItems/${dishId}.json`,
    );
    return response.data || null;
  },
);
export const editMenuItem = createAsyncThunk<
  void,
  { dishId: string; dish: IForm }
>("menuItems/editMenuItem", async ({ dishId, dish }) => {
  await axiosApi.put(`menuItems/${dishId}.json`, { ...dish });
});

export const sendOrder = createAsyncThunk<void, IOrder[]>(
  "cart/sendOrder",
  async (order: IOrder[]) => {
    await axiosApi.post("ordersPizza.json", { ...order });
  },
);

export const fetchAllOrders = createAsyncThunk(
  "cart/fetchAllOrders",
  async () => {
    const response: { data: IOrdersFromApi | null } =
      await axiosApi("ordersPizza.json");
    return response.data;
  },
);

export const deleteOneOrderItem = createAsyncThunk<string, string>(
  "cart/deleteOneOrderItem",
  async (orderId: string) => {
    await axiosApi.delete(`ordersPizza/${orderId}.json`);
    return orderId;
  },
);
