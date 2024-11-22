import { useCallback, useEffect, useState } from "react";
import {
  deleteOneOrderItem,
  fetchAllOrders,
} from "../../store/thunks/pizzaThunk.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectDeleteOrderLoading,
  selectOrdersAdmin,
  selectOrdersAdminLoading,
} from "../../store/slices/cardSlice.ts";
import { selectMenuItems } from "../../store/slices/menuItemsSlice.ts";
import { IOrdersForPage } from "../../types";
import OneOrders from "../../components/OneOrders/OneOrders.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import ButtonSpinner from "../../components/UI/ButtonSpinner/ButtonSpinner.tsx";

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrdersAdmin);
  const menuItems = useAppSelector(selectMenuItems);
  const orderLoading = useAppSelector(selectOrdersAdminLoading);
  const [result, setResult] = useState<IOrdersForPage[]>([]);
  const deleteLoading = useAppSelector(selectDeleteOrderLoading);
  useEffect(() => {
    const getOrdersForPage = () => {
      const ordersNew = orders.map((order) => {
        return {
          id: order.id,
          order: order.objOrders,
        };
      });
      const copyOrder = [...ordersNew];
      const copyOrderNew: IOrdersForPage[] = copyOrder.map((copyItem) => {
        return {
          id: copyItem.id,
          order: [],
        };
      });
      for (let i = 0; i < ordersNew.length; i++) {
        for (let j = 0; j < ordersNew[i].order.length; j++) {
          const index = Object.keys(ordersNew[i].order[j])[0];
          for (let k = 0; k < menuItems.length; k++) {
            if (menuItems[k].id === index) {
              copyOrderNew.map((copyItem) => {
                if (ordersNew[i].id === copyItem.id) {
                  return {
                    idOrder: copyItem.id,
                    order: copyItem.order.push({
                      title: menuItems[k].title,
                      price: menuItems[k].price,
                      amount: ordersNew[i].order[j][index],
                    }),
                  };
                }
              });
            }
          }
        }
      }
      setResult(copyOrderNew);
    };
    void getOrdersForPage();
  }, [menuItems, orders]);

  const fetchOrders = useCallback(async () => {
    await dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  const deleteOrder = async (id: string) => {
    await dispatch(deleteOneOrderItem(id));
    await dispatch(fetchAllOrders());
    if (result.length === 1) {
      setResult([]);
    }
  };

  return (
    <>
      {result.length > 0 ? (
        <>
          {orderLoading ? (
            <Spinner />
          ) : (
            <>
              {" "}
              {result.map((order) => (
                <OneOrders
                  deleteOrder={() => deleteOrder(order.id)}
                  key={order.id}
                  ordersItem={order}
                >
                  {deleteLoading.process && deleteLoading.id === order.id ? (
                    <ButtonSpinner />
                  ) : null}
                </OneOrders>
              ))}
            </>
          )}
        </>
      ) : (
        <p className={"text-center mt-4 fs-3"}>No orders</p>
      )}
    </>
  );
};

export default AdminOrders;
