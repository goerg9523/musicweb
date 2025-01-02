import React, { useState } from "react";
import styles from "./play-button-s.module.css"; // 引入對應的 CSS 模組

const PlayButtonS = () => {
  // 使用 useState 管理播放/暫停狀態
  const [isPlaying, setIsPlaying] = useState(false);

  // 點擊按鈕切換狀態
  const handleButtonClick = () => {
    setIsPlaying(!isPlaying); // 切換播放和暫停狀態
  };

  return (
    <>
    <div
      className={`${styles.button} ${isPlaying ? styles.pause : styles.play}`} // 根據狀態應用不同的樣式
      onClick={handleButtonClick} // 點擊切換
    >
      {/* 顯示不同的圖形 */}
      {isPlaying ? (
        <div className={styles.pauseIcon}>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div className={styles.playIcon}></div>
      )}
    </div>
    <br/>
    

    </>

  );
};



export default PlayButtonS;
