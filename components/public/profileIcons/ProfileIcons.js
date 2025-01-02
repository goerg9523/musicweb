import PropTypes from "prop-types";
import React from "react";
import styles from "./ProfileIcons.module.css"; // 引入模組化 CSS

export const ProfileIcons = ({ property1, className, img, onClick }) => {
  const defaultImage = "/image/img-mem/user-logo000.jpg"; // 設定預設圖示的路徑

  return (
    <div className={`${styles.profileIcons} ${styles[property1]} ${className}`}
    onClick={onClick}
    style={{ cursor: "pointer" }}
    >
      <img src={img || defaultImage} alt="Profile Icon" />
    </div>
  );
};

ProfileIcons.propTypes = {
  property1: PropTypes.oneOf(["md", "lg", "XS", "XXS"]),
  className: PropTypes.string,
  img: PropTypes.string,
};
