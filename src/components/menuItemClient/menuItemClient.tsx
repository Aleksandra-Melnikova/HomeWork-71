
import React, { MouseEventHandler } from 'react';
import { IMenuItem } from '../../types';

export interface IMenuItemClientProps  extends IMenuItem{
  onClick?: MouseEventHandler;
}
const MenuItemClient:React.FC<IMenuItemClientProps> = ({id,
  imageUrl,
  title,
  price,
  onClick,
  }) => {



  if (imageUrl.trim().length === 0) {
    imageUrl =
      "https://cdni.iconscout.com/illustration/premium/thumb/404-not-found-illustration-download-in-svg-png-gif-file-formats--search-error-web-page-user-interface-pack-design-development-illustrations-6430763.png?f=webp";
  }
  return (
      <div
        onClick={onClick}
        id = {id}
        className={
          'border border-1 border-dark-subtle  rounded-2 d-flex justify-content-between align-items-center menu-item mb-2'
        }
      >
        <div className={'col-4 img-block img-block-client'}>
          <img className={'photo-img'} src={imageUrl} alt={title}/>
        </div>
        <div className={'col-3  fs-2 '}>{title}</div>
        <div className={'col-2   fs-2 '}>{price} KGS</div>
    </div>
  );
};

export default MenuItemClient;