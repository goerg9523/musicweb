import React, { useEffect, useState } from "react";
import styles from "./blog-nav.module.css"; // 引入相應的 CSS 模組
import { ProfileIcons } from "@/components/public/profileIcons/ProfileIcons";

const BlogNav = ({ memberData }) => {
  const [member, setMember] = useState({});
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    if (memberData && memberData.m_birth) {
      const birthDate = new Date(memberData.m_birth);
      
      // 檢查日期是否有效
      if (!isNaN(birthDate.getTime())) {
        const formattedBirth = `${String(birthDate.getUTCMonth() + 1).padStart(2, "0")}-${String(
          birthDate.getUTCDate()
        ).padStart(2, "0")}`;
        setBirth(formattedBirth);
      } else {
        console.warn("Invalid birth date:", memberData.m_birth); // 顯示除錯訊息
        setBirth("未知日期"); // 如果日期無效，設定為「未知日期」
      }
    }
  }, [memberData]);
  

  return (
    <div className={styles["blogNav"]}>
      <div className={styles["icon"]}>
        <ProfileIcons
          property1="lg"
          className={styles.header}
          img={
            member.icon
              ? `http://localhost:3005${member.icon}`
              : "/image/img-mem/user-logo000.jpg"
          } // 預設圖示
        />
      </div>
      <h4 className={styles["name"]}>{memberData.m_nickname}</h4>
      <div className={styles["info"]}>
        <div className="gender">{memberData.m_gender}</div>
        {/* <div className={styles["birth"]}>{memberData.m_birth}</div> */}
        <div className={styles["birth"]}>{birth}</div>

        <div className={styles["else"]}>
          <div className={styles["location"]}>{memberData.m_location}</div>
          <div className="location">{memberData.m_district}</div>
        </div>
      </div>
      <div className={styles["bio"]}>
        <div className={styles["bio"]}>{memberData.m_bio}</div>
      </div>
    </div>
  );
};

export default BlogNav;
