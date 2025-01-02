import React, { useState, useEffect } from "react";
import style from "./bgv.module.css";

export default function Bgv() {
  return (
    <>
      <div className="video-background">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/George/1920x720-videos/v-(1).mp4" type="video/mp4" />
          你的瀏覽器不支援影片播放。
        </video>

      </div>
    </>
  );
}
