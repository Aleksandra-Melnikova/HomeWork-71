import { useCallback, useEffect } from 'react';
import {  fetchAllOrders } from '../../store/thunks/pizzaThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectOrdersAdmin } from '../../store/slices/cardSlice.ts';
import { selectMenuItems } from '../../store/slices/menuItemsSlice.ts';
import { IOrdersForPage } from '../../types';
import OneOrders from '../../components/OneOrders/OneOrders.tsx';


const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrdersAdmin);
  const menuItems = useAppSelector(selectMenuItems);

const ordersNew =orders.map(order => {
  return{
    id: order.id,
    order:order.objOrders
  }
});

const copyOrder = [...ordersNew]
  const copyOrderNew:IOrdersForPage[] = copyOrder.map(copyItem=>{
    return{
      id: copyItem.id,
      order:[]
    }
  })

  // const array:IOrdersForAdmin[] = [];
  for(let i=0; i<ordersNew.length; i++) {
    for(let j=0; j<ordersNew[i].order.length; j++){
      const index = Object.keys(ordersNew[i].order[j])[0];
      for(let k=0; k < menuItems.length; k++){
        if(menuItems[k].id=== index){
          // const obj:IOrdersForAdmin = {
          //   idOrder:ordersNew[i].id,
          // order: { title:menuItems[k].title,
          //   price:menuItems[k].price,
          //   amount:ordersNew[i].order[j][index]}
          // }
          copyOrderNew.map(copyItem=>{
            if(ordersNew[i].id ===copyItem.id){
              return {
                idOrder:copyItem.id,
                order: copyItem.order.push({title:menuItems[k].title,
                price:menuItems[k].price,
                amount:ordersNew[i].order[j][index]}),
              };
            }
          })
          // array.push(obj);
        }

      }

    }

  }
console.log( copyOrderNew)



  const fetchOrders = useCallback(async () => {
    await dispatch(fetchAllOrders ());
  }, [dispatch]);

  useEffect(() => {
   void fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      {copyOrderNew.map((order) => (
        <OneOrders total={0} ordersItem={order}/>
      ))}
    </>
  );
};

export default AdminOrders;