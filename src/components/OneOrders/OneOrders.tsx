import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';
import OneOrderItem from '../OneOrderItem/OneOrderItem.tsx';
import { IOrdersForPage } from '../../types';
import React from 'react';

export interface OneOrdersProps {
  total: number;
  ordersItem:IOrdersForPage;
}

const OneOrders:React.FC<OneOrdersProps> = ({total, ordersItem}) => {
  return (
    <div className={' rounded-1 border border-2 border-primary-subtle p-4 row justify-content-between mb-4'}>
      <div className={'col-7'}>
        {ordersItem.order.map((orderItem)=>(
<OneOrderItem key={orderItem.title+orderItem.amount+orderItem.price} amount={orderItem.amount} price={orderItem.price} title={orderItem.title}/>))}
        <div className={'d-flex  justify-content-between align-items-center'}>
          <span className={'d-block col-8 fs-4'}>
            Delivery
          </span>
          <span className={'d--block col-4 ms-3 fs-4'}>
            <strong>150</strong> KGS
          </span>
        </div>
      </div>
        <div className={'col-3 d-flex flex-column justify-content-between h-100 fs-4'}>
        <div >Order total:</div>
          <div><strong>{total}</strong></div>
        <ButtonLoading text={'Complete order'}/>


      </div>
    </div>
  );
};

export default OneOrders;