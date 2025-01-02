import React, { useState, useRef } from "react";
import styles from "./playyylist.module.css"; // 匯入 CSS 模組

export default function TrackItem({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.trackItem}>
      <button onClick={handlePlayPause} className={styles.playBtn}>
        {isPlaying ? "⏸" : "▶️"}
      </button>
      <div className={styles.waveform}></div>
      <div className={styles.trackInfo}>
        <h3 className={styles.trackTitle}>{track.title}</h3>
        <p className={styles.trackTags}>
          {track.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </p>
      </div>
      <span className={styles.trackDuration}>{track.duration}</span>
      <audio ref={audioRef} src={track.url}></audio>
    </div>
  );
}
