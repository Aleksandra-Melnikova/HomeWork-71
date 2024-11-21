import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";
import OneOrderItem from "../OneOrderItem/OneOrderItem.tsx";
import { IOrdersForPage } from "../../types";
import React from "react";
import { deleteOneOrderItem, fetchAllOrders } from '../../store/thunks/pizzaThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectDeleteOrderLoading } from '../../store/slices/cardSlice.ts';

export interface OneOrdersProps {
  ordersItem: IOrdersForPage;
}

const OneOrders: React.FC<OneOrdersProps> = ({ ordersItem }) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteOrderLoading);
  const deliveryPrice = 150;
  const total = ordersItem.order.reduce((acc, order) => {
    acc = acc + order.price * order.amount;
    return acc;
  }, deliveryPrice);

  const deleteOrder = async (id: string) => {
    await dispatch(deleteOneOrderItem(id));
    await dispatch(fetchAllOrders());
  };
  return (
    <>{ordersItem.order.length > 0 ? <div
      className={
        " rounded-1 border border-2 border-primary-subtle p-4 row justify-content-between mb-4"
      }
    >
      <div className={"col-7"}>
        {ordersItem.order.map((orderItem) => (
          <OneOrderItem
            key={orderItem.title + orderItem.amount + orderItem.price}
            amount={orderItem.amount}
            price={orderItem.price}
            title={orderItem.title}
          />
        ))}
        <div className={"d-flex  justify-content-between align-items-center"}>
          <span className={"d-block col-8 fs-4"}>Delivery</span>
          <span className={"d--block col-4 ms-3 fs-4"}>
            <strong>150</strong> KGS
          </span>
        </div>
      </div>
      <div
        className={
          "col-3 d-flex flex-column justify-content-between h-100 fs-4"
        }
      >
        <div>Order total:</div>
        <div>
          <strong>{total}</strong> KGS
        </div>
        <ButtonLoading isLoading={deleteLoading} isDisabled={deleteLoading} type={'button'}
                       onClick={() => deleteOrder(ordersItem.id)} text={"Complete order"}/>
      </div>
    </div>: <p className={'text-center mt-5 fs-4'}>No orders</p>}
    </>
  );
};

export default OneOrders;
