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

export interface IOrder{
[id: string]:  number;
}
