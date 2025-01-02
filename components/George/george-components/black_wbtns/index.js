import React, { useEffect, useState } from "react";
import styles from "./bwb.module.css"; // 引入 CSS 模組

const BlackWBtns = ({ type, onClick, children }) => {
  // 使用 styles 來應用樣式
  const buttonClass = `${styles.btn} ${styles[`btn-${type}`]}`;


  return (
    <button className={buttonClass} onClick={onClick}>
      <span className={styles["text-wrapper"]}>{children}</span>
    </button>
  );
};

export default BlackWBtns;
