import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./member-info.module.css";
import FormInput from "../form-input";
import Dropdown from "../form-option";
import { ProfileIcons } from "@/components/public/profileIcons/ProfileIcons";
import { useAuth } from "@/Context/auth-context";
import axios from "axios";

const MemberInfo = () => {
  const router = useRouter();
  const { auth, getAuthHeader } = useAuth();
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [member, setMember] = useState({});
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [message, setMessage] = useState("");
  const [bio, setBio] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.id) return;

      try {
        const response = await axios.get(`http://localhost:3005/member/mem-data/by-id/${auth.id}`, {
          withCredentials: true,
        });
        const data = response.data;

        if (data.success) {
          const memberData = data.memberData;
          setMember(memberData);
          
          // 設定生日為台灣時區格式
          const birthDate = new Date(memberData.m_birth);
          const formattedBirth = birthDate.toLocaleDateString("zh-TW", {
            timeZone: "Asia/Taipei",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          setBirth(formattedBirth);
          
          // setBirth(new Date(memberData.m_birth).toISOString().split("T")[0]); // Format birthdate as YYYY-MM-DD
          setGender(memberData.m_gender);
          setCounty(memberData.m_location || "");
          setDistrict(memberData.m_district || "");
          setBio(memberData.m_bio || "");
        } else {
          console.warn("未獲取到有效的會員資料");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.id]);

  const handleSaveName = async () => {
    try {
      await axios.put(
        "http://localhost:3005/member/update-nickname",
        { nickname: member.m_nickname },
        { withCredentials: true, headers: getAuthHeader() }
      );
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating nickname:", error);
      setMessage("更新暱稱失敗，請重試");
    }
  };

  const handleSaveGender = async () => {
    try {
      await axios.put(
        "http://localhost:3005/member/update-gender",
        { gender },
        { withCredentials: true, headers: getAuthHeader() }
      );
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
    } catch (error) {
      console.error("Error updating gender:", error);
      setMessage("更新性別失敗，請重試");
    }
  };

  const handleSaveLocation = async () => {
    try {
      await axios.put(
        "http://localhost:3005/member/update-location",
        { county, district },
        { withCredentials: true, headers: getAuthHeader() }
      );
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
    } catch (error) {
      console.error("Error updating location:", error);
      setMessage("更新所在地失敗，請重試");
    }
  };

  const handleSaveBio = async () => {
    try {
      await axios.put(
        "http://localhost:3005/member/update-bio",
        { bio },
        {
          withCredentials: true,
          headers: getAuthHeader(),
        }
      );
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
      setIsEditingBio(false);
    } catch (error) {
      console.error("Error updating bio:", error);
      setMessage("更新簡介失敗，請重試");
    }
  };

  const uploadImage = async (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setMessage("圖片大小不可超過 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("icon", file);

    try {
      const response = await axios.post(
        "http://localhost:3005/member/update-icon",
        formData,
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMember((prev) => ({ ...prev, m_icon: response.data.icon }));
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("圖片上傳失敗，請重試");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading) {
    return <div>加載中...</div>;
  }

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
                img={
                  member.m_icon
                    ? `http://localhost:3005${member.m_icon}`
                    : "/image/img-mem/user-logo000.jpg"
                }
                onClick={handleIconClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className={styles["file-input"]}
                style={{ display: "none" }}
              />
            </div>
            <h6>簡介</h6>
            <div className={styles["input-top"]}>
              {isEditingBio ? (
                <>
                  <FormInput
                    size="small"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <button onClick={handleSaveBio} className={styles.button1}>
                    儲存
                  </button>
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className={styles.button1}
                  >
                    取消
                  </button>
                </>
              ) : (
                <>
                  <span>{bio || "新增簡介"}</span>
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className={styles.button}
                  >
                    編輯
                  </button>
                </>
              )}
            </div>
            <div className={styles["body-input"]}>
              <div className={styles["input-left"]}>
                <h6 className={styles["left-title"]}>暱稱(顯示名稱)</h6>
                <div className={styles["left-text"]}>
                  {isEditing ? (
                    <>
                      <FormInput
                        size="small"
                        value={member.m_nickname}
                        onChange={(e) =>
                          setMember((prevMember) => ({
                            ...prevMember,
                            m_nickname: e.target.value,
                          }))
                        }
                      />
                      <button
                        onClick={handleSaveName}
                        className={styles.button1}
                      >
                        儲存
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className={styles.button1}
                      >
                        取消
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{member.m_nickname || "新增暱稱"}</span>
                      <button
                        onClick={() => setIsEditing(true)}
                        className={styles.button}
                      >
                        編輯
                      </button>
                    </>
                  )}
                </div>
                <h6 className={styles["left-title"]}>生日</h6>
                <div className={styles["left-text-birth"]}>
                  <FormInput value={birth} readOnly />
                </div>
              </div>
              <div className={styles["input-right"]}>
                <h6 className={styles["right-title"]}>性別</h6>
                <div className={styles["right-text"]}>
                  <Dropdown
                    type="gender"
                    initialValue={gender}
                    onChange={(value) => setGender(value)}
                  />
                  <button onClick={handleSaveGender} className={styles.button}>
                    儲存
                  </button>
                </div>
                <h6 className={styles["right-title"]}>所在地</h6>
                <div className={styles["right-text"]}>
                  <Dropdown
                    type="county"
                    sizeType={"medium"}
                    initialValue={{ county, district }}
                    onChange={(value) => {
                      setCounty(value.county);
                      setDistrict(value.district);
                    }}
                  />
                  <button onClick={handleSaveLocation} className={styles.button}>
                    儲存
                  </button>
                </div>
              </div>
            </div>
            {showSuccessOverlay && (
              <div className={styles.successOverlay}>
                <div className={styles.successMessage}>
                  <p>操作成功!</p>
                </div>
              </div>
            )}
            {message && <p className={styles["message"]}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
