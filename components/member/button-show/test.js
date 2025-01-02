import React, { useState, useEffect } from 'react';
import styles from './ButtonShowM.module.css';

const ButtonShow = ({ size = "large" }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 375);

  // 根據 size prop 決定按鈕大小樣式
  const sizeClass = size === "small" 
    ? styles.small 
    : size === "medium" 
    ? styles.medium 
    : styles.large;

  // 監聽視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 375);
    };
    
    window.addEventListener('resize', handleResize);
    
    // 清除事件監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${sizeClass} ${isHidden ? styles.hiddenButton : styles.showButton}`}
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? (isMobileView ? '隱藏' : '隱藏於頁面') : (isMobileView ? '顯示' : '顯示於頁面')}
      </button>
    </div>
  );
};

export default ButtonShow;
