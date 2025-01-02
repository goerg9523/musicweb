import React, { useState } from "react";
import styles from "./user-icon.module.css";

const UserIcon = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // 更新圖片顯示
    }
  };

  const handleClick = () => {
    document.getElementById("userIconInput").click(); // 模擬點擊 input 以選擇新圖片
  };

  return (
    <div className={styles.avatarContainer} onClick={handleClick}>
      {selectedImage ? (
        <img src={selectedImage} alt="User Icon" className={styles.avatarImage} />
      ) : (
        // 使用預設圖片
        
        <img src="/image/img-mem/user-logo000.jpg" alt="Default User Icon" className={styles.avatarImage} />

      )}

      {/* 隱藏的 input，用來上傳圖片 */}
      <input
        id="userIconInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload} // 每次選擇新圖片時觸發
      />
    </div>
  );
};

export default UserIcon;
