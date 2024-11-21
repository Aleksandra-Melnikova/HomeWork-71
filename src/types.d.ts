export interface IForm {
  title: string;
  price: number;
  imageUrl: string;
}
export interface IMenuItem {
  title: string;
  price: number;
  imageUrl: string;
  id: string;
}

export interface IMenuItemList {
  [id: string]: IForm;
}

export interface MenuItemsCart {
  dish: IMenuItem;
  amount: number;
}

export interface IOrder {
  [id: string]: number;
}

export interface IOrderItem {
  id: string;
  amount: number;
  price: number;
  title: string;
}

export interface IOrders {
  [id: string]: number;
}

export interface IOrdersFromApi {
  id: string;
  objOrders: IOrders[];
}
export interface IOrdersForAdmin {
  idOrder: string;
  order: { title: string; price: number; amount: number };
}
export interface IOrdersForAdminNew {
  idOrder: string;
  order: { title: string; price: number; amount: number }[];
}

export interface IOrdersForPage {
  id: string;
  order: { amount: number; price: number; title: string }[];
}
