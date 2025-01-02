import React, { useState } from "react";
import styles from "./form-input.module.css"; 

const FormInput = ({ size }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("GuavaVibe");

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  // 根據傳遞的 size 設定不同的 class
  const textSizeClass =
    size === "small" ? styles.textSmall : size === "medium" ? styles.textMedium : styles.textLarge;

  return (
    <div className={styles.container}>
      {isEditing ? (
        <input
          className={`${styles.input} ${textSizeClass}`}
          value={text}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <p className={`${styles.text} ${textSizeClass}`} onClick={handleTextClick}>
          {text}
        </p>
      )}
    </div>
  );
};

export default FormInput;
