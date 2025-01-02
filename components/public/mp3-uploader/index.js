import React, { useState } from "react";
import styles from "./mp3-uploader.module.css"; // 引入對應的 CSS 模組

const Mp3Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  // 當用戶選擇檔案時的處理函式
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "audio/mpeg") {
      setSelectedFile(file);
      const url = URL.createObjectURL(file); // 產生檔案的 URL
      setAudioURL(url);
    } else {
      alert("請上傳 MP3 格式的檔案");
    }
  };

  // 顯示選擇的檔案名稱
  const fileName = selectedFile ? selectedFile.name : "尚未選擇檔案";

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>上傳音樂檔案</h3>
      <input
        className={styles.input}
        type="file"
        accept=".mp3"
        onChange={handleFileChange}
      />
      <p className={styles.fileName}>{fileName}</p>

      {/* 如果有音樂檔案，顯示播放器 */}
      {audioURL && (
        <audio controls className={styles.audioPlayer} src={audioURL}>
          您的瀏覽器不支援音訊播放。
        </audio>
      )}
    </div>
  );
};

export default Mp3Uploader;
