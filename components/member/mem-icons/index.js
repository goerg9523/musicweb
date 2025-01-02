import React from "react";
import styles from "./mem-icons.module.css";
import Image from "next/image";

// 定義三種圖示尺寸
const sizeMap = {
  small: 16,
  medium: 24,
  large: 48,
};

const MemIcons = ({ iconName = "icon-mail", size = "medium" }) => {
  const iconPath = `/icons/${iconName}.svg`;
  const iconSize = sizeMap[size] || sizeMap.medium; // 根據 size prop 設定圖示大小

  return (
    <div className={styles["icons-container"]}>
      <Image
        src={iconPath}
        alt={`${iconName} Icon`}
        width={iconSize}
        height={iconSize}
        className={styles["icons-image"]}
      />
    </div>
  );
};

export default MemIcons;
