import React from 'react';
import styles from './WaveVideo.module.css';

const WaveVideo = () => (
  <div className={styles.videoContainer}>
    <video
      src="/kv.mp4"  // 影片路徑
      autoPlay
      loop
      muted
      playsInline
      className={styles.video}
    />
  </div>
);

export default WaveVideo;