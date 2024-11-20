import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchLoading, selectMenuItems } from '../../store/slices/menuItemsSlice.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllMenuItems } from '../../store/thunks/contactsThunk.ts';
import MenuItemClient from '../../components/menuItemClient/menuItemClient.tsx';


const ClientHome = () => {
  const menuItems = useAppSelector(selectMenuItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const fetchDishes = useCallback(async () => {
    await dispatch(fetchAllMenuItems());
  }, [dispatch]);
  useEffect(() => {
    {
      void fetchDishes();
    }
  }, [fetchDishes]);

  return (
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
    </div>
  );
};

export default ClientHome;