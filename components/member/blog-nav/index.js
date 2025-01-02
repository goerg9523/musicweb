import React, { useEffect, useState } from "react";
import styles from "./blog-nav.module.css";
import { ProfileIcons } from "@/components/public/profileIcons/ProfileIcons";

const BlogNav = ({ memberData }) => {
  const [birth, setBirth] = useState("");

  useEffect(() => {
    if (!memberData) return;

    if (memberData.m_birth) {
      const birthDate = new Date(memberData.m_birth);
      
      if (!isNaN(birthDate.getTime())) {
        const formattedBirth = birthDate.toLocaleDateString("zh-TW", {
          timeZone: "Asia/Taipei",
          month: "2-digit",
          day: "2-digit",
        });
        setBirth(formattedBirth);
      } else {
        console.warn("無效日期:", memberData.m_birth);
        setBirth("未知日期");
      }
    }
  }, [memberData]);

  if (!memberData) {
    return <div className={styles["blogNav"]}>載入中...</div>;
  }

  return (
    <div className={styles["blogNav"]}>
      <div className={styles["icon"]}>
        <ProfileIcons
          property1="lg"
          className={styles.header}
          img={
            memberData?.m_icon
              ? `http://localhost:3005${memberData.m_icon}`
              : "/image/img-mem/user-logo000.jpg"
          }
        />
      </div>
      <h4 className={styles["name"]}>{memberData?.m_nickname}</h4>
      <div className={styles["info"]}>
        <div className={styles["gender"]}>{memberData?.m_gender}</div>
        <div className={styles["birth"]}>{birth}</div>
        <div className={styles["else"]}>
          <div className={styles["location"]}>{memberData?.m_location}</div>
          <div className={styles["location"]}>{memberData?.m_district}</div>
        </div>
      </div>
      <div className={styles["bio"]}>
        <div className={styles["bio"]}>{memberData?.m_bio}</div>
      </div>
    </div>
  );
};

export default BlogNav;