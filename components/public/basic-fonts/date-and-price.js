import React from "react";
import style from "./styles/allfonts-styles.module.css";
import styles from "./styles/allfonts-bold-styles.module.css";

export default function DateAndPrice() {
  return (
    <>
      <div className="contain">
        <h3>日期格式</h3>
        <div className={style.font}>
          <p className={style["text-wrapper-7"]}>2024-11-21</p>
        </div>
        <div className={styles["font-bold"]}>
          <p className={styles["text-wrapper-7"]}>2024-11-21(bold)</p>
        </div>
        <h3>價格格式</h3>
        <div className={style.font}>
          <p className={style["text-wrapper-7"]}>$100</p>
        </div>
        <div className={styles["font-bold"]}>
          <p className={styles["text-wrapper-7"]}>$100(bold)</p>
        </div>
      </div>
      <style jsx>
        {`
          .contain {
            width: 1200px;
            margin: auto;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
