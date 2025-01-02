// components/Card.js
import React from "react";
import styles from "./new-card.module.css";

export default function NewCard({
  title="Fragments of Youth",
  artist='Dreams',
  description='Broken Wings  / Electric Heartbeat / Waves of Recklessnes',
  progress,
  bgColor,
  url
}) {
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <div className={styles.image}>
        <img src={url} alt={title} />
    
      </div>
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h6>{title}</h6>
      <p>{artist}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
