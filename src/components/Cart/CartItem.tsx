import {  MenuItemsCart } from '../../types'
import * as React from 'react'

interface Props {
  cartDish: MenuItemsCart;
}
const CartItem: React.FC<Props> = ({cartDish}) => {
  return (
    <div className="card mb-3 p-2">
        <div className="row align-items-center justify-content-between">
          <div className="col-4">{cartDish.dish.title}</div>
          <div className="col-4">x{cartDish.amount}</div>
          <div className="col-4">{cartDish.dish.price} KGS</div>
        </div>
    </div>
  )
}

export default CartItem;