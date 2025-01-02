import React, { useEffect, useState } from "react";
import styles from "./blog-nav.module.css"; // 引入相應的 CSS 模組
import { ProfileIcons } from "@/components/public/profileIcons/ProfileIcons";
import { set } from "lodash";

const BlogNav = () => {
  const [member, setMember] = useState({});
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include",
        });
        const data = await response.json();

        if (data.admin) {
          setMember(data.admin || {});

          setName(data.admin.nickname || "");
          setGender(data.admin.gender || "");
          setLocation(data.admin.location || "");
          setBio(data.admin.bio || "");
          setDistrict(data.admin.district || "");

          // 使用 UTC 解析生日
          const birthDate = new Date(data.admin.birth);
          const formattedBirth = `${String(
            birthDate.getUTCMonth() + 1
          ).padStart(2, "0")}-${String(birthDate.getUTCDate()).padStart(
            2,
            "0"
          )}`;
          setBirth(formattedBirth);
        } else {
          console.log("用戶尚未登入");
          router.push("/member/login");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
  }, []);

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
      <h4 className={styles["name"]}>{name}</h4>
      <div className={styles["info"]}>
        <div className="gender">{gender}</div>
        <div className={styles["birth"]}>{birth}</div>
        <div className={styles["else"]}>
          <div className={styles["location"]}>{location}</div>
          <div className="location">{district}</div>
        </div>
      </div>
      <div className={styles["bio"]}>
        <div className={styles["bio"]}>{bio}</div>
      </div>
    </div>
  );
};

export default BlogNav;
