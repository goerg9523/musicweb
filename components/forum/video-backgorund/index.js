import React from "react";
import styles from "./video-background.module.css";

const MotionBackground = ({
  videoSource,
  children,
  overlayColor = "rgba(0, 0, 0, 0.5)",
}) => {
  return (
    <div className={styles.container}>
      {/* Video Container */}
      <div className={styles.videoWrapper}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div
        className={styles.overlay}
        style={{ backgroundColor: overlayColor }}
      />

      {/* Content Container */}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MotionBackground;
