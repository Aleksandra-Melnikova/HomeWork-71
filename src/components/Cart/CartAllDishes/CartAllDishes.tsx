import React from "react";
import CartOneDish from "../CartOneDish.tsx";
import { MenuItemsCart } from "../../../types";
import { useDispatch } from "react-redux";
import { deleteDishFromCart } from "../../../store/slices/cardSlice.ts";

interface Props {
  cart: MenuItemsCart[];
  total: number;
}

const CartAllDishes: React.FC<Props> = ({ cart, total }) => {
  const dispatch = useDispatch();

  let cartAll = (
    <div className="alert alert-primary" role="alert">
      <h6 className="text-center my-4">No dish yet. Add something ...</h6>
    </div>
  );
  if (cart.length > 0) {
    cartAll = (
      <div>
        {cart.map((cartDish) => (
          <CartOneDish
            onDelete={() => dispatch(deleteDishFromCart(cartDish))}
            key={cartDish.dish.id}
            cartDish={cartDish}
          />
        ))}
        <div className="row align-items-center justify-content-between p-2">
          <div className="col-6 ">Delivery</div>
          <div className="col-5  ">150 KGS</div>
        </div>
        <hr />

        <div className="row row-cols-2 align-items-center justify-content-between px-3">
          <div className="text-start  p-0">
            <p>
              <strong>Total: </strong>
            </p>
          </div>
          <div className="text-end p-0">
            <p>{total} SOM</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row mt-2">{cartAll}</div>
    </div>
  );
};

export default CartAllDishes;
