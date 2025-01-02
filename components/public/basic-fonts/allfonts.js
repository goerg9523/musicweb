import React from "react";
import style from "./styles/allfonts-styles.module.css"; // 使用 CSS Modules

export const AllFonts = () => {
  return (
    <>
    <div className={style.font}> {/* 修正這裡的 className */}
      <div className={style['fonts-wrapper']}> {/* 同樣修正這裡的 className */}
        <div className={style.fonts}>
          <div className={style['text-wrapper']}>樂芭派 (GuavaVibe)</div>
          <div className={style.div}>樂芭派 (GuavaVibe)</div>
          <div className={style['text-wrapper-2']}>樂芭派 (GuavaVibe)</div>
          <div className={style['text-wrapper-3']}>樂芭派 (GuavaVibe)</div>
          <div className={style['text-wrapper-4']}>樂芭派 (GuavaVibe)</div>
          <div className={style['text-wrapper-5']}>樂芭派 (GuavaVibe)</div>
          <div className={style['text-wrapper-6']}>樂芭派 (GuavaVibe)</div>
          <div className={style['text-wrapper-7']}>樂芭派 (GuavaVibe)</div>
          <div className={style['text-wrapper-8']}>樂芭派 (GuavaVibe)</div>
        </div>
      </div>
    </div>
    </>
  );
};
