import React, { useState } from "react";
import style from "./products-othersYouLike.module.css";
import Link from "next/link";

export default function Items2({ image, singer, headline, likeid }) {
  const [hover, setHover] = useState(false);

// 這邊要抓到都是同一個分類的專輯 SQL 語法
  return (
    <div onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
      <Link href={`/George/product/${likeid}`}>
      <img src={`/${image}`} alt="" className={style.carouselImage} />
      {hover && (
        <div className={style.overlay}>
          <div className={style.headline}>{headline}</div>
          <div className={style.singer}>{singer}</div>
        </div>
      )}
      </Link>
    </div>
  );
}
