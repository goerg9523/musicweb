import React from "react";
import style from "./products-latest-launched.module.css";
import Link from "next/link";



export default function Items1({ description, headline, image, albumsid }) {


  return (
    <>
    <Link href={`/George/product/${albumsid}`}>
      <div className={style.carouselItem}>
        <img src={image} alt={headline} className={style.carouselImage} />
        <div className={style.carouselContent}>
          <h3>{headline}</h3>
          <div className={style.multilineEllipsis}>{description}</div>
        </div>
      </div>
      </Link>
    </>
  );
}
