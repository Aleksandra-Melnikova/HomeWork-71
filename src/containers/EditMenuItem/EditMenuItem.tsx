import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";

import Form from "../../components/Form/Form.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {
  selectEditLoading,
  selectFetchOneMenuItemLoading,
  selectOneMenuItem,
} from "../../store/slices/menuItemsSlice.ts";

import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { getOneMenuItemById } from "../../store/thunks/pizzaThunk.ts";

const EditMenuItem = () => {
  const { id } = useParams();
  const editLoading = useAppSelector(selectEditLoading);
  const dispatch = useAppDispatch();
  const oneMenuItem = useAppSelector(selectOneMenuItem);

  const getDishById = useCallback(async () => {
    if (id) {
      dispatch(getOneMenuItemById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getDishById();
  }, [getDishById]);

  const fetchLoading = useAppSelector(selectFetchOneMenuItemLoading);
  return (
    <>
      {fetchLoading || editLoading ? (
        <Spinner />
      ) : (
        <> {oneMenuItem ? <Form isEdit /> : null}</>
      )}
    </>
  );
};

export default EditMenuItem;
