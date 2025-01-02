import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./mem-blog.module.css";
import Nav from "@/components/public/nav";
import UserIcon from "@/components/public/user-icon";
import BlogNav from "../blog-nav/index";
import PlayButton from "@/components/public/play-button";
import Logout from "@/components/public/logout";
import Link from "next/link";

const MemberBlog = () => {
  const router = useRouter();
  const [memberData, setMemberData] = useState(null);  // 用於存放會員資料
  const [errorMessage, setErrorMessage] = useState(""); // 用於顯示錯誤訊息

  useEffect(() => {
    // 確保 router 已準備好且 URL 中存在 id
    if (!router.isReady || !router.query.id) {
      return;
    }

    const { id } = router.query; // 確保使用查詢參數

    const fetchMemberData = async () => {
      try {
        const response = await fetch(`http://localhost:3005/member/mem-data/${id}`, {
          method: "GET",
        });

        const data = await response.json();
        if (data.success) {
          setMemberData(data);  // 成功取得會員資料
        } else {
          setErrorMessage("無法取得會員資料");
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        setErrorMessage("資料讀取失敗");
      }
    };

    fetchMemberData();
  }, [router.isReady, router.query.id]);  // 當 router 就緒且 `id` 更新時重新執行

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

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
            {/* <BlogNav value={name} /> */}
            {memberData && <BlogNav memberData={memberData} />}
            {/* <button>
              <a href="./login">Login</a>
            </button> */}
            <br />

            <Link href="/member/login" passHref>
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
    <div>
      <h1>會員部落格頁面</h1>
      {memberData ? (
        <>
          <p>姓名: {memberData.m_nickname}</p>
          <p>信箱: {memberData.m_email}</p>
        </>
      ) : (
        <p>載入中...</p>
      )}
    </div>
    </>
  );
};

export default MemberBlog;
