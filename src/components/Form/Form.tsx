import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";
import React, { useEffect, useState } from "react";
import { IForm } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import {
   createMenuItems,
   editMenuItem,
} from '../../store/thunks/contactsThunk.ts';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectAddLoading,
 selectOneMenuItem,
} from '../../store/slices/menuItemsSlice.ts';
import { toast } from "react-toastify";

export interface IFormProps {
  isEdit?: boolean;
  existingForm?: IForm;
}
const initialForm: IForm = {
  title: "",
  price: 0,
  imageUrl: "",
};

const Form: React.FC<IFormProps> = ({
  isEdit = false,
  existingForm = initialForm,
}) => {
  const { id } = useParams();
  const [form, setForm] = useState<IForm>(existingForm);
  const navigate = useNavigate();
  const createAddLoading = useAppSelector(selectAddLoading);
  const dispatch = useAppDispatch();
  const oneMenuItem = useAppSelector(selectOneMenuItem);

  useEffect(() => {
    if (id) {
      if (oneMenuItem) setForm({ ...oneMenuItem });
    } else {
      setForm({ ...existingForm });
    }
  }, [oneMenuItem, existingForm, id]);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addNewDishes = async (e: React.FormEvent, form: IForm) => {
    e.preventDefault();
    if (id) {
      await dispatch(editMenuItem({ dishId: id, dish: { ...form } }));
      navigate("/admin");
      toast.success("Dish was edited successfully.");
    } else {
      if (form.title.trim().length > 0) {
        await dispatch(createMenuItems({ ...form }));
        navigate("/admin");
        toast.success("Dish added successfully.");
      } else {
        toast.warning("Fill in the title field.");
      }
    }
  };

  return (
    <div className="container">
      <form className="mx-auto w-75" onSubmit={(e) => addNewDishes(e, form)}>
        <h3 className="my-4"> {isEdit ? "Edit" : "Add new"} dish</h3>
        <div className="d-flex  mb-2">
          <label className="me-4 col-2" htmlFor="title">
            Title
          </label>
          <input
            required
            type="text"
            onChange={changeForm}
            value={form.title}
            id="title"
            name="title"
            className="form-control "
          />
        </div>

        <div className="d-flex mb-2">
          <label className="me-4 col-2" htmlFor="price">
            Price
          </label>
          <input
            required
            type="number"
            value={form.price}
            min={0}
            id="price"
            name="price"
            onChange={changeForm}
            className="form-control"
          />
        </div>

        <div className="d-flex mb-2">
          <label className="me-4 col-2" htmlFor="imageUrl">
            Photo url
          </label>
          <input
            value={form.imageUrl}
            onChange={changeForm}
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
          />
        </div>

        <div className="d-flex">
          <ButtonLoading
            text={"Save"}
            isLoading={createAddLoading}
            isDisabled={createAddLoading}
          />

        </div>
      </form>
    </div>
  );
};

export default Form;
