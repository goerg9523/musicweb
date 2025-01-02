import React, { useState, useEffect } from "react";
import styles from "./products-recommendation.module.css";
import Link from "next/link";

export default function Items2({
  description,
  headline,
  image,
  singer,
  albumsid,
}) {
  return (
    <div className={styles.itemContainer}>
      <Link href={`/George/product/${albumsid}`}>
        <div className={styles.imageWrapper}>
          {image && (
            <img
              src={image}
              alt={`Album ${headline} Image`}
              className={styles.recCarousel}
            />
          )}
        </div>
        <div className={styles.overlayItems}>
          <div>
            <img src={image} alt={headline} className={styles.overlayImg} />
          </div>
          <div className={styles.overlayContentBox}>
            <div className={styles.overlayHeadline}>{headline}</div>
            <div className={styles.overlaySinger}>{singer}</div>
          </div>
        </div>
        <h3 className={styles.itemHeadline}>{headline}</h3>
        <div className={styles.itemDescription}>{description}</div>
      </Link>
    </div>
  );
}
