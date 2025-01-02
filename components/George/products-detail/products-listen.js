import React from "react";
import style from "./products-listen.module.css";
import SpotifyPlaylist from "../spotifyAPI/playlist";
import SpotifyEmbedPlayer from "@/components/George/spotifyAPI/player";

export default function ProductsListen() {
  return (
    <>
      <div className={style}>
        {/* 左邊 */}
        <div>
          {/* 專輯圖示 */}
          {/* <img
            src="/George/products-images-350px/products-(110).jpg"
            alt="products-(110).jpg"
          /> */}
          {/* 播放控制 */}
          <div></div>
          {/* 歌曲時間、歌曲數 */}
          <div></div>
        </div>

        {/* 右邊試聽欄位 */}
        <div className={style.trylistenbox}>
          {/* <SpotifyEmbedPlayer /> */}
          <SpotifyPlaylist />
          {/* 如果自己做用map的ㄅ，但好像有一些播放器的樣子，到時候做功能的時候再一起研究看看 */}
        </div>
      </div>
    </>
  );
}
