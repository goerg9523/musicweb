// components/tabs/index.js
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./tabs.module.css";

const Tab = ({ text = "BLUE", className, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.category} ${
        isHovered ? styles.hover : styles.default
      } ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={styles["text-wrapper"]}>{text}</div>
    </div>
  );
};

Tab.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

// Make sure to explicitly export the Tab component
export default Tab;
