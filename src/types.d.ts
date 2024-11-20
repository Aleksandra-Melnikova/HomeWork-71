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
