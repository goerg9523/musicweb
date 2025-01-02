import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./register.module.css";
import MemIcons from "@/components/member/mem-icons";

const Register = () => {
  const [nickname, setNickname] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [accountError, setAccountError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const districtsData = {
    "台北市": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
    "新北市": ["板橋區", "三重區", "中和區", "永和區", "新莊區", "新店區", "樹林區", "土城區", "蘆洲區", "五股區", "泰山區", "林口區", "深坑區", "石碇區", "坪林區", "三芝區", "石門區", "八里區", "淡水區", "瑞芳區", "貢寮區", "金山區", "萬里區", "平溪區", "雙溪區", "烏來區"],
    // 可添加其他地區的行政區
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    setDistrict(""); // 清空行政區選擇

    if (districtsData[selectedLocation]) {
      setDistrictOptions(districtsData[selectedLocation]);
    } else {
      setDistrictOptions([]);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (account.length < 6) {
      setAccountError("帳號需至少6碼");
      return;
    } else {
      setAccountError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("請輸入有效的信箱格式");
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await axios.post(
        "http://localhost:3005/member/register",
        {
          account,
          password,
          email,
          nickname,
          location,
          district, // 傳送行政區
        }
      );

      if (response.data.message === "註冊成功") {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          router.push("/member-blog");
        }, 5000);
      } else {
        if (response.data.message === "該帳號已被註冊") {
          setAccountError("此帳號已被註冊");
          setEmailError("");
        } else if (response.data.message === "該信箱已被註冊") {
          setEmailError("此信箱已被註冊");
          setAccountError("");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (error.response.data.message === "該帳號已被註冊") {
          setAccountError("此帳號已被註冊");
          setEmailError("");
        } else if (error.response.data.message === "該信箱已被註冊") {
          setEmailError("此信箱已被註冊");
          setAccountError("");
        } else {
          setAccountError("");
          setEmailError("");
          setMessage("註冊失敗，請重試");
        }
      } else {
        setMessage("註冊失敗，請重試");
      }
    }
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-user" size="medium" />
              <select
                value={location}
                onChange={handleLocationChange}
                className={styles.input}
                required
              >
                <option value="">請選擇地區</option>
                <option value="台北市">台北市</option>
                <option value="新北市">新北市</option>
                {/* 可添加其他地區 */}
              </select>
            </div>
            {location && districtOptions.length > 0 && (
              <div className={styles.inputGroup}>
                <MemIcons iconName="icon-user" size="medium" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={styles.input}
                  required
                >
                  <option value="">請選擇行政區</option>
                  {districtOptions.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button type="submit" className={styles.button}>
              註冊
            </button>
          </form>
        </div>
      </div>
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <p>註冊成功!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
