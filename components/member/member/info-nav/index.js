import React from 'react';
import styles from './info-nav.module.css';

const InfoNav = ({ onScrollToInfo, onScrollToAcc, onScrollToPassword, onScrollToFav, onScrollToUploader }) => {
  return (
    <div className={styles["info-nav"]}>
      <h4 className={styles["nav-title"]}onClick={onScrollToInfo}>會員中心</h4>
      <div className={styles["nav-body"]}>
        <h5 className={styles["body-text"]} onClick={onScrollToInfo}>基本資料</h5>
        <h5 className={styles["body-text"]} onClick={onScrollToAcc}>帳號設定</h5>
        <h5 className={styles["body-text"]} onClick={onScrollToPassword}>變更密碼</h5>
        <h5 className={styles["body-text"]} onClick={onScrollToFav}>收藏名單</h5>
        {/* <h5 className={styles["body-text"]} onClick={onScrollToUploader}>上傳作品</h5> */}
      </div>
    </div>
  );
};

export default InfoNav;
