import React from 'react';
import { X} from 'react-bootstrap-icons';

export interface OneOrderItem {
  amount: number;
  price: number;
  title: string;
}
const OneOrderItem:React.FC<OneOrderItem> = ({amount, title,price}) => {
  return (
    <div className={'row mb-2 fs-4'}>
      <div className={'col-8'}>
        {amount}  <X/>  {title}
      </div>
      <div className={'col-3'}>
        <strong>{price}</strong> KGS
      </div>

    </div>
  );
};

export default OneOrderItem;