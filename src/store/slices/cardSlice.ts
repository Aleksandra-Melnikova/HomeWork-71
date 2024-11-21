import { IMenuItem, IOrder, IOrdersFromApi, MenuItemsCart } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { deleteOneOrderItem, fetchAllOrders, sendOrder } from '../thunks/pizzaThunk.ts';

interface CartState {
  cartDishes: MenuItemsCart[];
  ordersPizza: IOrder[];
  ordersAdmin: IOrdersFromApi[];
  isOrderLoading: boolean;
  isOrdersAdminLoading: boolean;
  isDeleteOrderLoading: boolean;
}

const initialState: CartState = {
  cartDishes: [],
  ordersPizza: [],
  ordersAdmin: [],
  isOrderLoading: false,
  isOrdersAdminLoading: false,
  isDeleteOrderLoading: false,
};

export const selectOrderLoading = (state: RootState) =>
  state.cart.isOrderLoading;
export const selectOrdersAdminLoading = (state: RootState) =>
  state.cart.isOrdersAdminLoading;
export const selectDeleteOrderLoading = (state: RootState) =>
  state.cart.isDeleteOrderLoading;
export const selectOrders = (state: RootState) => state.cart.ordersPizza;
export const selectOrdersAdmin = (state: RootState) => state.cart.ordersAdmin;
export const selectCartDishes = (state: RootState) => state.cart.cartDishes;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDish: (state, { payload: dish }: PayloadAction<IMenuItem>) => {
      const indexDish = state.cartDishes.findIndex(
        (dishCart) => dishCart.dish.id === dish.id,
      );
      if (indexDish === -1) {
        state.cartDishes = [...state.cartDishes, { dish, amount: 1 }];
        state.ordersPizza = [...state.ordersPizza, { [dish.id]: 1 }];
      } else {
        const cartCopy = [...state.cartDishes];
        const pizzaOrdersCopy = [...state.ordersPizza];
        const copyDishCart = { ...cartCopy[indexDish] };
        const copyOneOrder = { ...pizzaOrdersCopy[indexDish] };
        copyDishCart.amount++;
        copyOneOrder[dish.id]++;
        pizzaOrdersCopy[indexDish] = copyOneOrder;
        cartCopy[indexDish] = copyDishCart;
        state.cartDishes = [...cartCopy];
        state.ordersPizza = [...pizzaOrdersCopy];
      }
    },
    deleteDishFromCart: (
      state,
      { payload: dish }: PayloadAction<MenuItemsCart>,
    ) => {
      const indexDish = state.cartDishes.findIndex(
        (dishCart) => dishCart.dish.id === dish.dish.id,
      );
      const cartCopy = [...state.cartDishes];
      const pizzaOrdersCopy = [...state.ordersPizza];
      const copyDishCart = { ...cartCopy[indexDish] };
      const copyOneOrder = { ...pizzaOrdersCopy[indexDish] };
      copyDishCart.amount--;
      copyOneOrder[dish.dish.id]--;
      pizzaOrdersCopy[indexDish] = copyOneOrder;
      cartCopy[indexDish] = copyDishCart;
      state.cartDishes = [...cartCopy];
      state.ordersPizza = [...pizzaOrdersCopy];
    },
    clearCart: (state) => {
      state.cartDishes = [];
      state.ordersPizza = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.isOrdersAdminLoading = true;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state, action: PayloadAction<IOrdersFromApi | null>) => {
          state.isOrdersAdminLoading = false;
          if (action.payload) {
            const postResponseNew = Object.entries(action.payload);
            const array: IOrdersFromApi[] = [];
            for (let i = 0; i < postResponseNew.length; i++) {
              const obj: IOrdersFromApi = {
                id: postResponseNew[i][0],
                objOrders: postResponseNew[i][1],
              };
              array.push(obj);
            }
            state.ordersAdmin = array;
          }
        },
      )
      .addCase(fetchAllOrders.rejected, (state) => {
        state.isOrdersAdminLoading = false;
      })
      .addCase(deleteOneOrderItem.pending, (state) => {
      state.isDeleteOrderLoading = true;
    })
      .addCase(deleteOneOrderItem.fulfilled, (state) => {
        state.isDeleteOrderLoading= false;
      })
      .addCase(deleteOneOrderItem.rejected, (state) => {
        state.isDeleteOrderLoading = false;
      })
  },
});
export const cartReducer = cartSlice.reducer;
export const { addDish, deleteDishFromCart, clearCart } = cartSlice.actions;
