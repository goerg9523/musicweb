import React from "react";
import styles from "./info-nav.module.css"; // 引入相應的 CSS 模組

const InfoNav = ({ setPosition }) => {
  return (
    <div className={styles["info-nav"]}>
      <h4
        className={styles["nav-title"]}
        onClick={() => {
          setPosition(0);
        }}
      >
        會員中心
      </h4>
      <div className={styles["nav-body"]}>
        <h5 className={styles["body-text"]}
           onClick={() => {
          setPosition(50);
        }}
        >基本資料</h5>
        <h5 className={styles["body-text"]}
             onClick={() => {
          setPosition(150);
        }}
        >帳號設定</h5>
        <h5 className={styles["body-text"]}
           onClick={() => {
          setPosition(2000);
        }}
        
        >變更密碼</h5>
        {/* <h5 className={styles["body-text"]}>訂單查詢</h5> */}
        <h5
          className={styles["body-text"]}
          onClick={() => {
            setPosition(2400);
          }}
        >
          收藏名單
        </h5>

        {/* <button className='btn' onClick={()=>{
          window.scrollTo({
            top:0,
            behavior:'smooth'
          });
        }}>Click</button> */}
        {/* <h5 className={styles["body-text"]}>上傳作品</h5> */}
        {/* <h5 className={styles["body-text"]}>帳號刪除</h5> */}
      </div>
    </div>
  );
};

export default InfoNav;
