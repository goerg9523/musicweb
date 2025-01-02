import React, { useState } from "react";
import styles from "./form-inputM.module.css";

const FormInputM = ({ size = "medium", isEmail = false }) => {
  const [inputValue, setInputValue] = useState(""); // 保存輸入的內容
  const [isValid, setIsValid] = useState(true); // 驗證狀態
  const [isEditing, setIsEditing] = useState(true); // 是否顯示 input
  
  const sizeClass =
    size === "small"
      ? styles.small
      : size === "large"
      ? styles.large
      : styles.medium;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue); // 更新輸入的值

    // 如果是信箱格式，檢查是否符合格式
    if (isEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailPattern.test(inputValue));
    }
  };

  // 當按下 Enter 鍵時顯示輸入內容
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false); // 隱藏輸入框，顯示輸入內容
    }
  };

  return (
    <div className={styles.inputContainer}>
      {isEditing ? (
        <input
          type="text"
          className={`${styles.input} ${sizeClass} ${isEmail && !isValid ? styles.invalid : ""}`}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // 監聽按下鍵盤事件
          placeholder={isEmail ? "請輸入有效的信箱" : ""}
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className={styles.displayText}>
          {inputValue || "點擊編輯"}
        </span>
      )}
      {/* 錯誤訊息 */}
      {isEmail && !isValid && (
        <div className={styles.errorText}>請輸入有效的信箱地址</div>
      )}
    </div>
  );
};

export default FormInputM;
