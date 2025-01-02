import React, { useState } from "react";
import styles from "./password-input.module.css";

const PasswordInput = ({
  size = "medium",
  placeholder = "請輸入文字",
  isEmail = false,
  value, // 父組件傳入的值
  onChange, // 父組件傳入的 onChange 回調
}) => {
  const [isPasswordMode, setIsPasswordMode] = useState(true); // 管理是否顯示為密碼模式
  const [isValid, setIsValid] = useState(true); // 管理輸入內容是否有效

  // 當用戶修改輸入框時，執行回調
  const handleInputChange = (e) => {
    const newValue = e.target.value;

    if (isEmail) {
      setIsValid(newValue.includes("@")); // 驗證是否包含 "@"
    } else {
      setIsValid(true);
    }

    if (onChange) {
      onChange(e); // 將事件回調給父組件
    }
  };

  // 控制是否顯示為密碼模式
  const togglePasswordMode = () => {
    setIsPasswordMode(!isPasswordMode);
  };

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.inputContainer}>
        <div className={styles["input-text"]}>
          {/* 顯示輸入框 */}
          <input
            type={isPasswordMode ? "password" : "text"} // 密碼或普通文本模式
            className={`${styles.input} ${styles[size]}`}
            value={value} // 使用父組件傳入的值
            onChange={handleInputChange} // 傳遞變化事件
            placeholder={placeholder}
          />
        </div>

        {/* 眼睛圖標按鈕，用於切換顯示模式 */}
        <button
          className={`${styles.toggleButton} ${styles[size]}`}
          onClick={togglePasswordMode}
        >
          <img
            src={
              isPasswordMode ? "/icons/eye-open.svg" : "/icons/eye-close.svg"
            }
            alt="Toggle Visibility"
            className={`${styles.icon} ${styles[size]}`}
          />
        </button>
      </div>
      {!isValid && <div className={styles.errorText}>請輸入有效的信箱</div>}
    </div>
  );
};

export default PasswordInput;
