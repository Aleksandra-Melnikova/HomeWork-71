import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectFetchLoading,
  selectMenuItems,
} from "../../store/slices/menuItemsSlice.ts";
import { useCallback, useEffect, useState } from "react";
import { fetchAllMenuItems, sendOrder } from "../../store/thunks/pizzaThunk.ts";
import MenuItemClient from "../../components/menuItemClient/menuItemClient.tsx";
import Modal from "../../components/UI/Modal/Modal.tsx";
import {
  addDish,
  clearCart,
  selectCartDishes,
  selectOrderLoading,
  selectOrders,
} from "../../store/slices/cardSlice.ts";
import CartDishes from "../../components/Cart/CartDishes/CartDishes.tsx";
import { IOrder } from "../../types";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";

const ClientHome = () => {
  const [showModal, setShowModal] = useState(false);
  const menuItems = useAppSelector(selectMenuItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector(selectCartDishes);
  const order = useAppSelector(selectOrders);
  const orderLoading = useAppSelector(selectOrderLoading);
  const fetchDishes = useCallback(async () => {
    await dispatch(fetchAllMenuItems());
  }, [dispatch]);
  const deliveryPrice = 150;
  useEffect(() => {
    {
      void fetchDishes();
    }
  }, [fetchDishes]);

  const total = cartDishes.reduce((acc, cartDish) => {
    acc = acc + cartDish.dish.price * cartDish.amount;
    return acc;
  }, deliveryPrice);

  const sendPizzaOrder = async (order: IOrder[]) => {
    await dispatch(sendOrder(order));
    dispatch(clearCart());
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        title={"Your order:"}
        closeModal={() => setShowModal(false)}
      >
        {" "}
        <>
          {total === deliveryPrice ? (
            <p className={"text-center mt-5 mb-5"}>
              {" "}
              Cart is empty, add dishes to your order
            </p>
          ) : (
            <>
              <CartDishes total={total} cart={cartDishes} />
              <div
                className={"d-flex justify-content-center align-items-center"}
              >
                <button
                  className={"me-3  btn btn-danger"}
                  type={"button"}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <ButtonLoading
                  text={"Order"}
                  type={"button"}
                  isLoading={orderLoading}
                  isDisabled={orderLoading}
                  onClick={() => sendPizzaOrder(order)}
                />
              </div>
            </>
          )}
        </>
      </Modal>
      <div>
        {menuItems.length > 0 || isFetchLoading ? (
          <>
            {isFetchLoading ? (
              <Spinner />
            ) : (
              <>
                {" "}
                {menuItems.map((menuItem) => (
                  <MenuItemClient
                    onClick={() => dispatch(addDish(menuItem))}
                    key={menuItem.id}
                    id={menuItem.id}
                    title={menuItem.title}
                    imageUrl={menuItem.imageUrl}
                    price={menuItem.price}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <p className="d-block text-center mt-5">No dishes</p>
        )}
        <div className={"d-flex justify-content-between align-items-center"}>
          <div className={"mt-4 mb-4 fs-4"}>
            <strong>Order total</strong> (include delivery 150 KGS): {total} KGS
          </div>
          <button
            type={"button"}
            className={"btn btn-primary fs-4"}
            onClick={() => setShowModal(true)}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ClientHome;
