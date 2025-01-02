import React, { useState } from "react";
import styles from "./form-option.module.css"; // 引入對應的 CSS Modules 檔案

const Dropdown = () => {
  // 用 useState 來管理選擇的性別
  const [selectedGender, setSelectedGender] = useState("");

  return (
    <>
      <div>
        <select className={styles.dropdown}>
          <option value="">性別</option>
          <option value="male">男</option>
          <option value="female">女</option>
          <option value="other">不透露</option>
        </select>
      </div>

      
    </>
  );
};

export default Dropdown;
