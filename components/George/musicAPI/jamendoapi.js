import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./jamendo.module.css"

const CLIENT_ID = '1c0b1d31';

const Jamendoapi = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // 從 Jamendo API 獲取音樂清單
    const fetchTracks = async () => {
      try {
        const response = await axios.get('https://api.jamendo.com/v3.0/tracks', {
          params: {
            client_id: CLIENT_ID,
            format: 'json',
            limit: 10,  // 可以調整要獲取的曲目數量
            order: 'popularity_total'
          }
        });
        setTracks(response.data.results);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  useEffect(()=>{
    console.log("listen: ", tracks);
    
  }, [tracks])

  return (
    <div>
      <h1>Jamendo 音樂清單</h1>
      <div>
        {tracks.map((track) => (
          <div key={track.id} style={styles.trackItem}>
            <img
              src={track.album_image}
              alt={`${track.album_name} 專輯封面`}
              style={styles.albumImage}
            />
            <h3>{track.name}</h3>
            <p>歌手名稱: {track.artist_name}</p>
            <p>專輯名稱: {track.album_name}</p>
            <p>發行日期: {track.releasedate}</p>

            {/* 播放音樂 */}
            <audio controls src={track.audio} style={styles.audioPlayer}>
              您的瀏覽器不支援音樂播放。
            </audio>

            {/* 下載按鈕 */}
            {/* {track.audiodownload_allowed && (
              <a href={track.audiodownload} download style={styles.downloadLink}>
                下載音樂
              </a>
            )} */}

            {/* 授權連結 */}
            {/* <a href={track.license_ccurl} target="_blank" rel="noopener noreferrer">
              查看授權條款
            </a> */}

            {/* 分享按鈕 */}
            {/* <a href={track.shareurl} target="_blank" rel="noopener noreferrer" style={styles.shareLink}>
              分享這首歌
            </a> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jamendoapi;