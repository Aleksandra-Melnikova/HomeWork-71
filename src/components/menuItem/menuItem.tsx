import React, { } from "react";
import { useNavigate } from "react-router-dom";
import {  IMenuItem } from '../../types';
import { toast } from "react-toastify";
import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";
import { useAppSelector } from "../../app/hooks.ts";
import { selectDeleteLoading } from "../../store/slices/menuItemsSlice.ts";

export interface IMenuItemProps extends IMenuItem {
  onDelete: (id: string) => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  id,
  imageUrl,
  title,
  price,
  onDelete,
}) => {

  const isDeleteLoading = useAppSelector(selectDeleteLoading);
  const navigate = useNavigate();
  const deleteOneMenuItem = async (id: string) => {
    onDelete(id);
    toast.success(`Dish was deleted successfully.`);
    navigate(`/admin`);
  };
  if (imageUrl.trim().length === 0) {
    imageUrl =
      "https://cdni.iconscout.com/illustration/premium/thumb/404-not-found-illustration-download-in-svg-png-gif-file-formats--search-error-web-page-user-interface-pack-design-development-illustrations-6430763.png?f=webp";
  }


  return (
    <>

      <div
        className={
          'border border-1 border-dark-subtle  rounded-2 row justify-content-between align-items-center menu-item mb-2'
        }
      >
        <div className={'col-3 img-block'}>
          <img className={'photo-img'} src={imageUrl} alt={title}/>
        </div>
        <div className={'col-3 ms-2 fs-2 '}>{title}</div>
        <div className={'col-2   fs-2 '} >{price} KGS</div>
        <div className={'col-3 d-flex justify-content-end align-items-center'}>
          <button className={' btn btn-primary me-2 d-inline-block'} onClick={() => navigate(`/admin/edit/${id}`)}>Edit</button>
          <div className={'d-inline-block'}><ButtonLoading text={'Delete'} isLoading={isDeleteLoading}
                         onClick={() => deleteOneMenuItem(id)}></ButtonLoading></div>


      </div>
      </div>
    </>
  );
};

export default MenuItem;
