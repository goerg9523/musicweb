import React, { useState } from "react";
import styles from "./play-button.module.css";

const PlayButton = ({ size = "medium" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleButtonClick = () => {
    setIsPlaying(!isPlaying);
  };

  // 根據傳遞的 size prop 決定按鈕大小
  const sizeClass =
    size === "small"
      ? styles.small
      : size === "large"
      ? styles.large
      : styles.medium;

  return (
    <div
      className={`${styles.button} ${sizeClass} ${
        isPlaying ? styles.pause : styles.play
      }`}
      onClick={handleButtonClick}
    >
      {isPlaying ? (
        <div className={styles.pauseIcon}>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div className={styles.playIcon}></div>
      )}
    </div>
  );
};

export default PlayButton;
