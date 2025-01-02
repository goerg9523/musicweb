import React, { useEffect, useState } from "react";
import styles from "./bwbm.module.css"; // 引入 CSS 模組

const BlackWBtnsMobile = ({ type, onClick, children }) => {
  // 使用 styles 來應用樣式
  const buttonClass = `${styles.btn} ${styles[`btn-${type}`]}`;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth < 400)
      if (window.innerWidth < 400) {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button className={buttonClass} onClick={onClick}>
      <span className={styles["text-wrapper"]}>{children}</span>
    </button>
  );
};

export default BlackWBtnsMobile;
