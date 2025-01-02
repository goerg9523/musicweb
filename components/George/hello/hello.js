import React from "react";
import style from "./hello.module.css"

export default function Hello() {
  return (
    <>
        <div className={style.banner}>
        <div className={style.vcover}></div>
          <video autoPlay muted loop>
            <source
              src="/George/1920x720-videos/v-(3).mp4"
              type="video/mp4"
            />
            你的瀏覽器不支援影片播放。
          </video>
        </div>
    </>
  );
}
