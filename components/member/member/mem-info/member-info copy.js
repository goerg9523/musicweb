import styles from "./member-info.module.css";
import { useRouter } from "next/router";
import FormInput from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";
import { useEffect, useState } from "react";
import { ProfileIcons } from "@/components/public/profileIcons/ProfileIcons";
import axios from "axios";

const MemberInfo = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [member, setMember] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include",
        });
        const data = await response.json();
        setMember(data.admin || {});
        setName(data.admin?.nickname || "");

        if (data.admin?.birth) {
          const birthDate = new Date(data.admin.birth);
          const formattedBirth = `${birthDate.getFullYear()}-${String(birthDate.getMonth() + 1).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;
          setBirth(formattedBirth);
        }

        setGender(data.admin?.gender || "");
        setRegion(data.admin?.location || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 更新暱稱的函數
  const updateNickname = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3005/member/update-info/nickname",
        { nickname: name },
        { withCredentials: true }
      );      
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating nickname:", error);
      alert("暱稱更新失敗，請重試");
    }
  };
  

  return (
    <div className={styles["member-info"]}>
      <div className={styles.container}>
        <div className={styles["info-main"]}>
          <h5 className={styles["main-title"]}>基本資料</h5>
          <div className={styles["main-body"]}>
            <div className={styles["body-icon"]}>
              <ProfileIcons 
                property1="lg" 
                className={styles.header} 
                img={member.icon || "/image/img-Jade/default.jpg"} // 設置預設圖片
              /> 
            </div>
            <h6 className={styles["icon-title"]}>
              上傳頭像建議尺寸： 140x140px 以內，圖片檔案大小不可超過 2MB
            </h6>
            <h6 className={styles["input-top"]}>
              簡介 <FormInput />
            </h6>
            <div className={styles["body-input"]}>
              <div className={styles["input-left"]}>
                <h6 className={styles["left-title"]}>暱稱(顯示名稱)</h6>
                <div className={styles["left-text"]}>
                  <FormInput value={name} onChange={(e) => setName(e.target.value)} />
                  <button onClick={updateNickname}>保存</button> {/* 保存按鈕 */}
                </div>
                <h6 className={styles["left-title"]}>生日</h6>
                <div className={styles["left-text"]}>
                  <FormInput value={birth} readOnly />
                </div>
              </div>
              <div className={styles["input-right"]}>
                <h6 className={styles["right-title"]}>性別</h6>
                <div className={styles["right-text"]}>
                  <Dropdown type="gender" initialValue={gender} onChange={setGender} />
                  <ButtonToggleM size="small" />
                </div>
                <h6 className={styles["right-title"]}>所在地</h6>
                <div className={styles["right-text"]}>
                  <Dropdown type="region" initialValue={region} onChange={setRegion} />
                  <ButtonToggleM size="small" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
