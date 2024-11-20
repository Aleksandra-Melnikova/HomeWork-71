import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchLoading, selectMenuItems } from '../../store/slices/menuItemsSlice.ts';
import { useCallback, useEffect, useState } from 'react';
import { fetchAllMenuItems } from '../../store/thunks/contactsThunk.ts';
import MenuItemClient from '../../components/menuItemClient/menuItemClient.tsx';
import Modal from '../../components/UI/Modal/Modal.tsx';
import { addDish, selectCartDishes } from '../../store/slices/cardSlice.ts';
import CartDishes from '../../components/Cart/CartDishes/CartDishes.tsx';

const ClientHome = () => {
  const [showModal, setShowModal] = useState(false);
  const menuItems = useAppSelector(selectMenuItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector( selectCartDishes);
  const total = 0;
  const fetchDishes = useCallback(async () => {
    await dispatch(fetchAllMenuItems());
  }, [dispatch]);
  useEffect(() => {
    {
      void fetchDishes();
    }
  }, [fetchDishes]);

  return (
    <>
    <Modal show={showModal} title={'Your order:'}  closeModal={() => setShowModal(false)}> <>
      <CartDishes cart={cartDishes}/>
      {cartDishes.length > 0 ?
        <div className="text-center">
        </div> : null
      }
    </>
    </Modal>
    <div>
      {menuItems.length > 0 || isFetchLoading ? (
        <>
          {isFetchLoading ? (
            <Spinner/>
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
        <p className="d-block text-center mt-5">
          No dishes
        </p>
      )}
      <div className={'d-flex justify-content-between align-items-center'}>
        <div>Order total: {total} KGS</div>
        <button type={'button'} className={'btn btn-primary'} onClick={()=>setShowModal(true)}>Checkout</button>
      </div>
    </div></>
  );
};

export default ClientHome;