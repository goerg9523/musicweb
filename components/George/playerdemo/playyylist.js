import React from "react";
import TrackItem from "./trackitem.js";
import styles from "./playyylist.module.css"; // 匯入 CSS 模組

export default function Playlist() {
  const tracks = [
    { id: 1, title: "Discover", duration: "2:02", tags: ["Bells", "Electronic Drums", "Piano", "Synth"], url: "audio-url-1" },
    { id: 2, title: "Disturbing Night", duration: "2:53", tags: ["Orchestra", "Piano", "Synth"], url: "audio-url-2" },
  ];

  return (
    <div className={styles.playlist}>
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </div>
  );
}