import { MenuItemsCart } from "../../types";
import * as React from "react";
import { Cart } from "react-bootstrap-icons";
import { MouseEventHandler, useEffect, useState } from "react";

interface Props {
  cartDish: MenuItemsCart;
  onDelete: MouseEventHandler;
}
const CartOneDish: React.FC<Props> = ({ cartDish, onDelete }) => {
  const [showMenuItemsCart, setShowMenuItemsCart] = useState<
    "d-block" | "d-none"
  >("d-block");
  useEffect(() => {
    if (cartDish.amount === 0) {
      setShowMenuItemsCart("d-none");
    } else {
      setShowMenuItemsCart("d-block");
    }
  }, [cartDish.amount]);

  return (
    <div className={`card mb-3 p-2 ${showMenuItemsCart}`}>
      <div className="row align-items-center justify-content-between">
        <div className="col-3">{cartDish.dish.title}</div>
        <div className="col-3">x{cartDish.amount}</div>
        <div className="col-3">{cartDish.dish.price} KGS</div>
        <button
          onClick={onDelete}
          className={"col-2 bg-transparent border-0 "}
          type={"button"}
        >
          <Cart />
        </button>
      </div>
    </div>
  );
};

export default CartOneDish;
