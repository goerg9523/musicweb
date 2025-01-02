import React from "react";
import styles from "./footer-mobile.module.css";

export default function FooterMobile() {
  return (
    <>
      <div className={styles.wrap}>
        <ul className={styles.container}>
          <li className={styles.category}>
            <div className={styles.item}>
              <p>探索商品分類</p>
              <ul className={styles.info}>
                <li className={styles.infoItem}>所有商品分類</li>
                <li className={styles.infoItem}>設計誌</li>
                <li className={styles.infoItem}>跨國合併結帳專區</li>
                <li className={styles.infoItem}>找靈感</li>
              </ul>
            </div>
          </li>
          <li className={styles.category}>
            <div className={styles.item}>
              <p>販售</p>
              <ul className={styles.info}>
                <li className={styles.infoItem}>問與答</li>
                <li className={styles.infoItem}>我想在-芭樂派-上販售</li>
              </ul>
            </div>
          </li>
          <li className={styles.category}>
            <div className={styles.item}>
              <p>幫助</p>
              <ul className={styles.info}>
                <li className={styles.infoItem}>大宗採購</li>
                <li className={styles.infoItem}>訊息公告</li>
                <li className={styles.infoItem}>服務條款</li>
              </ul>
            </div>
          </li>
          <li className={styles.category}>
            <div className={styles.item}>
              <p>認識芭樂派</p>
              <ul className={styles.info}>
                <li className={styles.infoItem}>關於我們</li>
                <li className={styles.infoItem}>媒體報導</li>
                <li className={styles.infoItem}>全新</li>
                <li className={styles.infoItem}>ESG-永續發展</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
