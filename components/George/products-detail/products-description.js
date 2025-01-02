import React from "react";
import style from "./products-description.module.css";


export default function ProductsDescription({ albumDetail, albumImages, pid }) {


  return (
    <>
      <div className={style.containDescription}>
        {/* 左邊圖 */}
        <div className={style.imgBox}>
          <div className={style.topImageBox}>
            <img
              src={`/${albumImages?.images?.[1]?.p_productsimg_filename}`}
              alt=""
              className={style.topImage}
            />
          </div>
          <div className={style.bottomImagesBox}>
            <img
              src={`/${albumImages?.images?.[2]?.p_productsimg_filename}`}
              alt=""
              className={style.bottomImages}
            />
            <img
              src={`/${albumImages?.images?.[3]?.p_productsimg_filename}`}
              alt=""
              className={style.bottomImages}
            />
          </div>
        </div>
        {/* 右邊詳述 */}
        <div className={style.desBox}>
          <h2>Description</h2>
          <p>
          {albumDetail?.p_albums_description}
          </p>
          <p>
            {" "}
            {albumDetail?.p_albums_engdescription}
          </p>
        </div>
      </div>
    </>
  );
}
