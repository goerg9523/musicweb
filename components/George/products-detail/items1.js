import React, { useState } from "react";
import style from "./products-othersYouLike.module.css";
import Link from "next/link";

export default function Items1({
  image,
  singer,
  headline,
  moreid
}) {
  const [hover, setHover] = useState(false);


  // 這邊要從資料庫抓到都是同一個創作者的專輯 SQL語法
  return (
    <div onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
      <Link href={`/George/product/${moreid}`}>
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
