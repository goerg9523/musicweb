import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function MySpotifyPlayer({ accessToken, playlistId }) {
  return (
    <SpotifyPlayer
      token={accessToken}
      uris={[`spotify:playlist:${playlistId}`]}
      styles={{
        bgColor: 'rgba(20, 255, 0, 0.5)',
        color: '#000000',                   // 文本顏色
        loaderColor: '#fff',                // 加載動畫顏色
        sliderColor: '#1db954',             // 進度條顏色
        trackArtistColor: '#000000',        // 歌手名稱顏色
        trackNameColor: '#000000',          // 歌曲名稱顏色
        trackProgressColor: '#ff0000',      // 歌曲進度條顏色
        trackDurationColor: '#0000ff',      // 歌曲時長顏色
        buttonColor: '#ff9900',             // 播放/暫停按鈕顏色
        trackNameSize: '24px',              // 歌曲名稱字體大小
        trackArtistSize: '18px',            // 歌手名稱字體大小
      }}
      autoPlay={true}
      play={true}
    />
  );
}
