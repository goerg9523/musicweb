import React from "react";
import styles from "./buttons.module.css"; // 引入 CSS 模組

const Button = ({ type, onClick, children }) => {
  // 使用 styles 來應用樣式
  const buttonClass = `${styles.btn} ${styles[`btn-${type}`]}`;
  const buttonHoverClass = styles[`btn-${type}-hover`];

  return (
    <button
      className={buttonClass}
      onMouseOver={(e) => e.currentTarget.classList.add(buttonHoverClass)} // 添加 hover 類
      onMouseOut={(e) => e.currentTarget.classList.remove(buttonHoverClass)} // 移除 hover 類
      onClick={onClick}
    >
      <span className={styles["text-wrapper"]}>{children}</span>
    </button>
  );
};

export default Button;
