import React from "react";
import styles from "./mem-blog.module.css"; // 引入相應的 CSS 模組
import Nav from "@/components/public/nav";
import UserIcon from "@/components/public/user-icon";
import BlogNav from "../blog-nav";
import PlayButton from "@/components/public/play-button";

const MemBlog = () => {
  return (
    <>
      <div className={styles["wrapper"]}>
        <Nav className={styles["nav"]} />

        <div className={styles["container"]}>
          <div className={styles["leftContent"]}>
            {/* <InfoNav /> */}
            <BlogNav />
           
          </div>
          <div className={styles["rightContent"]}>
            {/* 設定圖標，放置在右上角 */}
            <img
              src="/icons/icon-setting.svg"
              alt="設定"
              className={styles["settingIcon"]}
            />

            <div className={styles["albumSec"]}>
              <div className={styles["album"]}>
                <div className="icon"></div>
                <UserIcon />
              </div>

              <div className={styles["album"]}>
                <PlayButton size="large" />
              </div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
            </div>
          </div>
        </div>

        <div className={styles["footer"]}>Footer</div>
      </div>
    </>
  );
};

export default MemBlog;
