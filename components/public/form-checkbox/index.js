import React, { useState } from "react";
import styles from "./form-checkbox.module.css"; // 確保引入對應的 CSS Modules 檔案

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false); // 用 useState 管理選擇狀態

  // 點擊事件切換選擇狀態
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`} // 根據狀態切換樣式
      onClick={handleCheckboxClick}
    />
  );
};

export default Checkbox;
