import React, { useState } from "react";
import { Heart as HeartIcon } from "lucide-react";
import styles from "./heart.module.css";

const Heart = ({ size = 1, initialActive = false, onClick }) => {
  const [isActive, setIsActive] = useState(initialActive);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClick) {
      onClick(!isActive);
    }
  };

  const getHeartClass = () => {
    const state = isActive ? "active" : "default";
    return `${styles.heart} ${styles[`heart${size}-${state}`]} ${
      isActive ? styles.active : ""
    }`;
  };

  return (
    <div className={styles.heartContainer}>
      <HeartIcon
        className={getHeartClass()}
        fill={isActive ? "#FF0000" : "none"}
        onClick={handleClick}
        stroke={isActive ? "#FF0000" : "#494949"}
      />
    </div>
  );
};

export default Heart;
