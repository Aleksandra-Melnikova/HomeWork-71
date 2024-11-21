import {  IMenuItem, IOrder, MenuItemsCart } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {
 sendOrder
} from '../thunks/pizzaThunk.ts';


interface CartState {
  cartDishes:MenuItemsCart[];
  ordersPizza: IOrder[];
  isOrderLoading: boolean,
}


const initialState:CartState = {
  cartDishes:[],
  ordersPizza: [],
  isOrderLoading: false,
};

export const selectOrderLoading = (state: RootState) =>
  state.cart.isOrderLoading;
export const selectOrders = (state: RootState) => state.cart.ordersPizza;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
addDish: (state, {payload:dish}:PayloadAction<IMenuItem>)=>{

    const indexDish = state.cartDishes.findIndex(dishCart => dishCart.dish.id === dish.id);
    if (indexDish === -1) {
      state.cartDishes= [...state.cartDishes, {dish, amount: 1}];
      state.ordersPizza = [...state.ordersPizza,{[dish.id]: 1}];
    } else {
      const cartCopy = [...state.cartDishes];
      const pizzaOrdersCopy = [...state.ordersPizza];
      const copyDishCart = {...cartCopy[indexDish]};
     let copyOneOrder = {...pizzaOrdersCopy[indexDish]};
      copyDishCart.amount++;
      copyOneOrder[dish.id]++;
      pizzaOrdersCopy[indexDish] = copyOneOrder;
      cartCopy[indexDish] = copyDishCart;
      state.cartDishes= [...cartCopy];
      state.ordersPizza = [...pizzaOrdersCopy];
    }
},
    deleteDishFromCart:(state, {payload:dish}:PayloadAction<MenuItemsCart>)=>{

      const indexDish = state.cartDishes.findIndex(dishCart => dishCart.dish.id === dish.dish.id);
        const cartCopy = [...state.cartDishes];
      const pizzaOrdersCopy = [...state.ordersPizza];
        const copyDishCart = {...cartCopy[indexDish]};
      let copyOneOrder = {...pizzaOrdersCopy[indexDish]};
        copyDishCart.amount--;
      copyOneOrder[dish.dish.id]--;
      pizzaOrdersCopy[indexDish] = copyOneOrder;
        cartCopy[indexDish] = copyDishCart;
        state.cartDishes= [...cartCopy];
      state.ordersPizza = [...pizzaOrdersCopy];
    },
clearCart:(state)=>{
    state.cartDishes=[];
    state.ordersPizza=[];
},
    },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.isOrderLoading  = false;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.isOrderLoading = false;
      });
  },

});
export const cartReducer = cartSlice.reducer;
export const {addDish,deleteDishFromCart,clearCart} = cartSlice.actions;