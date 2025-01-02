import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./mem-blog.module.css"; // 引入相應的 CSS 模組
import Nav from "@/components/public/nav";
import UserIcon from "@/components/public/user-icon";
import BlogNav from "../blog-nav/index";
import PlayButton from "@/components/public/play-button";
import Logout from "@/components/public/logout";
import Link from "next/link";
import axios from "axios";

const MemBlog = () => {
  const router = useRouter();
  const { memberId } = router.query; // 使用 useRouter 取得 memberId
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");



const handleLogout = async () => {
  try {
    const response = await axios.post("http://localhost:3005/member/logout", {}, { withCredentials: true });
    if (response.data.success) {
      alert(response.data.message);
      // 跳轉到登入頁面或首頁
      window.location.href = "/member/login";
    }
  } catch (error) {
    console.error("登出失敗:", error);
  }
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("http://localhost:3005/mem-data/${memberId}", {
        const response = await fetch("http://localhost:3005/mem-data", {

          credentials: "include", // 攜帶 cookie，確保 session 可以被讀取
        });
        const data = await response.json();
        console.log(data);

        setName(data.admin?.nickname); // 確保讀取 admin 裡的 nickname
        setBirth(data.admin?.birth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [memberId]); // 監聽 memberId 變化

  return (
    <>
      <div className={styles["wrapper"]}>
        {/* <Nav className={styles["nav"]} /> */}
        <Nav />
        {/* 設定圖標，放置在右上角 */}
        <Link href="/Jade/member-center">
          <img
            src="/icons/icon-setting.svg"
            alt="設定"
            className={styles["settingIcon"]}
          />
        </Link>

        <div className={styles["container"]}>
          <div className={styles["leftContent"]}>
            {/* <InfoNav /> */}
            <BlogNav value={name} />
            {/* <button>
              <a href="./login">Login</a>
            </button> */}
            <br />

            <Link href="/login" passHref>
              <div className={styles.logoutButton}>
                登出
              </div>
            </Link>
          </div>

          <div className={styles["rightContent"]}>
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
