import React, { useState, useRef } from "react";
import Button from "@/components/public/buttons";
import Heart from "@/components/public/hearts";
import WhiteWBtns from "@/components/public/white_wbtns";
import styles from "./cate.module.css";
import PlayButton from "../../play-button";

export default function Commodity1({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const carouselRef = useRef(null);
  const thumbnailsToShow = images.length * 50;
  const carouse = useRef();

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  console.log(thumbnailsToShow);
  console.log(position);

  const handlePrev = () => {
    if (position > -thumbnailsToShow) {
      const newPosition = position - 50; // 向右移動 50px
      setPosition(newPosition);
      if (carouselRef.current) {
        carouselRef.current.style.left = `${newPosition}px`;
      }
    }
  };

  const handleNext = () => {
    if (position != 0) {
      const newPosition = position + 50; // 向左移動 50px
      setPosition(newPosition);
      if (carouselRef.current) {
        carouselRef.current.style.left = `${newPosition}px`;
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ul>
          {images.map((item, index) => (
            <li key={index}>
              <div className={styles.link} onClick={() => handleThumbnailClick(index)}>
                <div className={styles.crossImg}>
                  <img className={styles.cursorPointer} src={item.url}/>
                </div>
                <div className={styles.bottom}>
                  <h3>xxxxx</h3>
                  <p>xxxxxxxxxxxxxxxxxxxxxxxx</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.right}>
        <div className={styles.img}>
          <div className={styles.bg}>
            <img
              src={images[currentIndex]?.url}
              className={styles.cursorPointer}
            />
          </div>
          <div className={styles.carouse}>
            <button className={styles.button} onClick={handleNext}>
              -
            </button>
            <div className={styles.crossSm}>
              <ul
                className={styles.sm}
                ref={carouselRef}
                style={{ left: `${position}px` }}
              >
                {images.map((image, index) => (
                  <li key={index} className={styles.crossSmImg}>
                    <img
                      src={image.url}
                      onClick={() => handleThumbnailClick(index)}
                      className={styles.cursorPointer}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <button className={styles.button} onClick={handlePrev}>
              +
            </button>
          </div>
          <button className={styles.buttonBig}>
            <p>前往專輯</p>
          </button>
          <button className={styles.buttonBig}>
            <p>我的最愛</p>
          </button>
          <div className={styles.PlayButton}>
           <PlayButton />
          </div>
        </div>
      </div>
    </div>
  );
}
