import React, { useState, useEffect } from "react";
import styles from "./carousel.module.css"; // 引入 CSS 模組

const Carousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 自動輪播
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(autoSlide); // 清除計時器
  }, [currentIndex, images.length, interval]);

  // 手動切換到上一張圖片
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  // 手動切換到下一張圖片
  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // 點擊指示器跳轉到對應的幻燈片
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={styles.carouselImage}
        />
      </div>

      <button className={styles.leftArrow} onClick={goToPrevious}>
        {/* <<<<<<<< HEAD:components/public/carousel/index.js */}
        <img
          src="/image/img-Jade/arrow-left.png"
          alt="Left Arrow"
          className={styles.arrowImage}
        />
      </button>
      <button className={styles.rightArrow} onClick={goToNext}>
        <img
          src="/image/img-Jade/arrow-right.png"
          alt="Left Arrow"
          className={styles.arrowImage}
        />
        {/* ========
        <img
          src="/arrow-left.png"
          alt="Left Arrow"
          className={styles.arrowImage}
        /> */}
      </button>
  

      {/* 幻燈片指示器 */}
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
