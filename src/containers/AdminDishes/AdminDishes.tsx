import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectFetchLoading, selectMenuItems,
} from '../../store/slices/menuItemsSlice.ts';
import { useCallback, useEffect } from "react";
import {
   deleteOneMenuItem,
 fetchAllMenuItems,
} from '../../store/thunks/contactsThunk.ts';
import MenuItem from "../../components/menuItem/menuItem.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { useNavigate } from 'react-router-dom';

const AdminDishes = () => {
  const menuItems = useAppSelector(selectMenuItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchDishes = useCallback(async () => {
    await dispatch(fetchAllMenuItems());
  }, [dispatch]);
  useEffect(() => {
    {
      void fetchDishes();
    }
  }, [fetchDishes]);

  const deleteMenuItem = async (id: string) => {
    await dispatch(deleteOneMenuItem(id));
    await fetchDishes();
  };

  const onClick = ()=>{
    navigate(`/admin/add`);
  };

  return (
    <>
      <div className={'my-4 d-flex align-items-center justify-content-between'}>
        <h1>Dishes</h1>
        <button onClick={onClick} type={"button"} className={'btn btn-primary'}>Add new Dish</button>
      </div>
      {menuItems.length > 0 || isFetchLoading ? (
        <>
          {isFetchLoading ? (
            <Spinner/>
          ) : (
            <>
              {" "}
              {menuItems.map((menuItem) => (
                <MenuItem
                  key={menuItem.id}
                  id={menuItem.id}
                  title={menuItem.title}
                  imageUrl={menuItem.imageUrl}
                  price={menuItem.price}
                  onDelete={() =>  deleteMenuItem(menuItem.id)}
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
    </>
  );
};

export default AdminDishes;
