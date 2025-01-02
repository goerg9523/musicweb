import React, { useState, useEffect } from "react";
import styles from "./form-inputM.module.css";

const FormInputM = ({ size = "medium", value='', onChange, isEmail = false, isPhone = false, readOnly = false  }) => {
  const [inputValue, setInputValue] = useState(value||""); 
  const [isValid, setIsValid] = useState(true); // 驗證狀態
  const [isEditing, setIsEditing] = useState(true); // 是否正在編輯
  const sizeClass =
    size === "small"
      ? styles.small
      : size === "large"
      ? styles.large
      : styles.medium;

      useEffect(() => {
        setInputValue(value||"");
      }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue); // 更新輸入的值

    // 信箱格式驗證
    if (isEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailPattern.test(inputValue));
    }

    // 手機格式驗證
    if (isPhone) {
      const phonePattern = /^(\+?\d{1,4}[-.\s]?)?(\d{10})$/; // 簡單的手機格式驗證
      setIsValid(phonePattern.test(inputValue));
    }

    // 將值傳遞回父元件
    if (onChange) {
      onChange(e);
    }
  };

  // 按下 Enter 鍵
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.inputContainer}>
      {isEditing ? (
        <input
          type="text"
          className={`${styles.input} ${sizeClass} ${(isEmail || isPhone) && !isValid ? styles.invalid : ""}`}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // 監聽按下鍵盤事件
          placeholder={isEmail ? "請輸入有效的信箱" : isPhone ? "請輸入有效的手機號碼" : ""}
          readOnly={readOnly} // 設定為只讀模式
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className={styles.displayText}>
          {inputValue || ""}
        </span>
      )}
      {/* 錯誤訊息 */}
      {/* {(isEmail && !isValid) && (
        <div className={styles.errorText}>請輸入有效的信箱地址</div>
      )}
      {(isPhone && !isValid) && (
        <div className={styles.errorText}>請輸入有效的手機號碼</div>
      )} */}
    </div>
  );
};

export default FormInputM;
