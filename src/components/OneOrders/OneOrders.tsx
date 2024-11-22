import OneOrderItem from "../OneOrderItem/OneOrderItem.tsx";
import { IOrdersForPage } from "../../types";
import React from "react";

export interface OneOrdersProps extends React.PropsWithChildren {
  ordersItem: IOrdersForPage;
  deleteOrder: (id: string) => void;
}

const OneOrders: React.FC<OneOrdersProps> = ({
  ordersItem,
  deleteOrder,
  children,
}) => {
  const deliveryPrice = 150;
  const total = ordersItem.order.reduce((acc, order) => {
    acc = acc + order.price * order.amount;
    return acc;
  }, deliveryPrice);

  return (
    <div
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
        <div className={"mt-3"}>
          <button
            type="button"
            onClick={() => deleteOrder(ordersItem.id)}
            className="d-block btn btn-primary pe-4"
          >
            <span>Complite order</span>
            {children}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneOrders;
