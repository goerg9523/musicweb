import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./register.module.css";
import MemIcons from "@/components/member/mem-icons";
import { useAuth } from "@/Context/auth-context"; // 引入 useAuth

const Register = () => {
  const { login } = useAuth(); // 從 AuthContext 中取出 login 函數
  const router = useRouter();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [nickname, setNickname] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [birthDate, setBirthDate] = useState(""); // 新增生日狀態
  const [district, setDistrict] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [accountError, setAccountError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Current date in "YYYY-MM-DD" format for max date
  const today = new Date().toISOString().split("T")[0];

  const districtsData = {
    台北市: [
      "中正區",
      "大同區",
      "中山區",
      "松山區",
      "大安區",
      "萬華區",
      "信義區",
      "士林區",
      "北投區",
      "內湖區",
      "南港區",
      "文山區",
    ],
    新北市: [
      "板橋區",
      "三重區",
      "中和區",
      "永和區",
      "新莊區",
      "新店區",
      "樹林區",
      "土城區",
      "蘆洲區",
      "五股區",
      "泰山區",
      "林口區",
      "深坑區",
      "石碇區",
      "坪林區",
      "三芝區",
      "石門區",
      "八里區",
      "淡水區",
      "瑞芳區",
      "貢寮區",
      "金山區",
      "萬里區",
      "平溪區",
      "雙溪區",
      "烏來區",
    ],
    基隆市: [
      "仁愛區",
      "信義區",
      "中正區",
      "中山區",
      "安樂區",
      "暖暖區",
      "七堵區",
    ],
    桃園市: [
      "中壢區",
      "平鎮區",
      "龍潭區",
      "楊梅區",
      "新屋區",
      "觀音區",
      "桃園區",
      "龜山區",
      "八德區",
      "大溪區",
      "復興區",
      "大園區",
      "蘆竹區",
    ],
    新竹市: ["東區", "北區", "香山區"],
    新竹縣: [
      "竹北市",
      "湖口鄉",
      "新豐鄉",
      "新埔鎮",
      "關西鎮",
      "芎林鄉",
      "寶山鄉",
      "竹東鎮",
      "五峰鄉",
      "橫山鄉",
      "尖石鄉",
      "北埔鄉",
      "峨眉鄉",
    ],
    苗栗縣: [
      "竹南鎮",
      "頭份市",
      "三灣鄉",
      "南庄鄉",
      "獅潭鄉",
      "後龍鎮",
      "通霄鎮",
      "苑裡鎮",
      "苗栗市",
      "造橋鄉",
      "頭屋鄉",
      "公館鄉",
      "大湖鄉",
      "泰安鄉",
      "銅鑼鄉",
      "三義鄉",
      "西湖鄉",
      "卓蘭鎮",
    ],
    台中市: [
      "中區",
      "東區",
      "南區",
      "西區",
      "北區",
      "北屯區",
      "西屯區",
      "南屯區",
      "太平區",
      "大里區",
      "霧峰區",
      "烏日區",
      "豐原區",
      "后里區",
      "石岡區",
      "東勢區",
      "和平區",
      "新社區",
      "潭子區",
      "大雅區",
      "神岡區",
      "大肚區",
      "沙鹿區",
      "龍井區",
      "梧棲區",
      "清水區",
      "大甲區",
      "外埔區",
      "大安區",
    ],
    彰化縣: [
      "彰化市",
      "芬園鄉",
      "花壇鄉",
      "秀水鄉",
      "鹿港鎮",
      "福興鄉",
      "線西鄉",
      "和美鎮",
      "伸港鄉",
      "員林市",
      "社頭鄉",
      "永靖鄉",
      "埔心鄉",
      "溪湖鎮",
      "大村鄉",
      "埔鹽鄉",
      "田中鎮",
      "北斗鎮",
      "田尾鄉",
      "埤頭鄉",
      "溪州鄉",
      "竹塘鄉",
      "二林鎮",
      "大城鄉",
      "芳苑鄉",
      "二水鄉",
    ],
    南投縣: [
      "南投市",
      "中寮鄉",
      "草屯鎮",
      "國姓鄉",
      "埔里鎮",
      "仁愛鄉",
      "名間鄉",
      "集集鎮",
      "水里鄉",
      "魚池鄉",
      "信義鄉",
      "竹山鎮",
      "鹿谷鄉",
    ],
    雲林縣: [
      "斗南鎮",
      "大埤鄉",
      "虎尾鎮",
      "土庫鎮",
      "褒忠鄉",
      "東勢鄉",
      "台西鄉",
      "崙背鄉",
      "麥寮鄉",
      "斗六市",
      "林內鄉",
      "古坑鄉",
      "莿桐鄉",
      "西螺鎮",
      "二崙鄉",
      "北港鎮",
      "水林鄉",
      "口湖鄉",
      "四湖鄉",
      "元長鄉",
    ],
    嘉義市: ["東區", "西區"],
    嘉義縣: [
      "番路鄉",
      "梅山鄉",
      "竹崎鄉",
      "阿里山鄉",
      "中埔鄉",
      "大埔鄉",
      "水上鄉",
      "鹿草鄉",
      "太保市",
      "朴子市",
      "東石鄉",
      "六腳鄉",
      "新港鄉",
      "民雄鄉",
      "大林鎮",
      "溪口鄉",
      "義竹鄉",
      "布袋鎮",
    ],
    台南市: [
      "中西區",
      "東區",
      "南區",
      "北區",
      "安平區",
      "安南區",
      "永康區",
      "歸仁區",
      "新化區",
      "左鎮區",
      "玉井區",
      "楠西區",
      "南化區",
      "仁德區",
      "關廟區",
      "龍崎區",
      "官田區",
      "麻豆區",
      "佳里區",
      "西港區",
      "七股區",
      "將軍區",
      "學甲區",
      "北門區",
      "新營區",
      "後壁區",
      "白河區",
      "東山區",
      "六甲區",
      "下營區",
      "柳營區",
      "鹽水區",
      "善化區",
      "大內區",
      "山上區",
      "新市區",
      "安定區",
    ],
    高雄市: [
      "楠梓區",
      "左營區",
      "鼓山區",
      "三民區",
      "鹽埕區",
      "前金區",
      "新興區",
      "苓雅區",
      "前鎮區",
      "旗津區",
      "小港區",
      "鳳山區",
      "林園區",
      "大寮區",
      "大樹區",
      "大社區",
      "仁武區",
      "鳥松區",
      "岡山區",
      "橋頭區",
      "燕巢區",
      "田寮區",
      "阿蓮區",
      "路竹區",
      "湖內區",
      "茄萣區",
      "永安區",
      "彌陀區",
      "梓官區",
      "旗山區",
      "美濃區",
      "六龜區",
      "甲仙區",
      "杉林區",
      "內門區",
      "茂林區",
      "桃源區",
      "那瑪夏區",
    ],
    屏東縣: [
      "屏東市",
      "三地門鄉",
      "霧台鄉",
      "瑪家鄉",
      "九如鄉",
      "里港鄉",
      "高樹鄉",
      "鹽埔鄉",
      "長治鄉",
      "麟洛鄉",
      "竹田鄉",
      "內埔鄉",
      "萬丹鄉",
      "潮州鎮",
      "泰武鄉",
      "來義鄉",
      "萬巒鄉",
      "崁頂鄉",
      "新埤鄉",
      "南州鄉",
      "林邊鄉",
      "東港鎮",
      "琉球鄉",
      "佳冬鄉",
      "新園鄉",
      "枋寮鄉",
      "枋山鄉",
      "春日鄉",
      "獅子鄉",
      "車城鄉",
      "牡丹鄉",
      "恆春鎮",
      "滿州鄉",
    ],
    台東縣: [
      "台東市",
      "綠島鄉",
      "蘭嶼鄉",
      "延平鄉",
      "卑南鄉",
      "鹿野鄉",
      "關山鎮",
      "海端鄉",
      "池上鄉",
      "東河鄉",
      "成功鎮",
      "長濱鄉",
      "太麻里鄉",
      "金峰鄉",
      "大武鄉",
      "達仁鄉",
    ],
    花蓮縣: [
      "花蓮市",
      "新城鄉",
      "秀林鄉",
      "吉安鄉",
      "壽豐鄉",
      "鳳林鎮",
      "光復鄉",
      "豐濱鄉",
      "瑞穗鄉",
      "萬榮鄉",
      "玉里鎮",
      "卓溪鄉",
      "富里鄉",
    ],
    宜蘭縣: [
      "宜蘭市",
      "頭城鎮",
      "礁溪鄉",
      "壯圍鄉",
      "員山鄉",
      "羅東鎮",
      "三星鄉",
      "大同鄉",
      "五結鄉",
      "冬山鄉",
      "蘇澳鎮",
      "南澳鄉",
      "釣魚台",
    ],
    澎湖縣: ["馬公市", "西嶼鄉", "望安鄉", "七美鄉", "白沙鄉", "湖西鄉"],
    金門縣: ["金沙鎮", "金湖鎮", "金寧鄉", "金城鎮", "烈嶼鄉", "烏坵鄉"],
    連江縣: ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"],
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    setDistrict("");

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
          name,
          account,
          password,
          email,
          nickname,
          location,
          district,
          birth: birthDate,
          gender,
        }
      );

      if (response.status === 201) {
        setShowSuccess(true);

        // 自動登入並導航到會員頁面
        const loginResult = await login(account, password);
        if (loginResult.success) {
          router.push(`/member/blog/${loginResult.account}`);
        } else {
          setMessage("自動登入失敗，請手動登入");
        }
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

  const handleAccountChange = (e) => {
    const value = e.target.value;
    setAccount(value);
    if (value.length < 6) {
      setAccountError("帳號需至少6碼");
    } else {
      setAccountError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("請輸入有效的信箱格式");
    } else {
      setEmailError("");
    }
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <img
            src="/image/img-mem/user-logo000.jpg"
            alt="Logo"
            className={styles.logo}
          />
          <h2 className={styles.title}>會員註冊</h2>
          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-nickname" size="medium" />
              <input
                type="text"
                placeholder="暱稱 (必填*之後可做修改)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-user" size="medium" />
              <input
                type="text"
                placeholder="帳號 (必填*至少6碼)"
                value={account}
                onChange={handleAccountChange}
                className={styles.input}
                required
              />
            </div>
            {accountError && <p className={styles.error}>{accountError}</p>}

            <div className={styles.inputGroup}>
              <MemIcons iconName="icons-lock-2" size="medium" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
                          <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              <MemIcons
                iconName={showPassword ? "icons-eye-off" : "icons-eye"}
                size="medium"
              />
            </span>
            </div>
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-mail" size="medium" />
              <input
                type="email"
                placeholder="信箱"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
                required
              />
            </div>
            {emailError && <p className={styles.error}>{emailError}</p>}
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-location" size="medium" />
              <select
                value={location}
                onChange={handleLocationChange}
                className={styles.input}
                required
              >
                <option value="">選擇所在地</option>
                <option value="台北市">台北市</option>
                <option value="新北市">新北市</option>
                <option value="基隆市">基隆市</option>
                <option value="桃園市">桃園市</option>
                <option value="新竹市">新竹市</option>
                <option value="新竹縣">新竹縣</option>
                <option value="宜蘭縣">宜蘭縣</option>
                <option value="台中市">台中市</option>
                <option value="苗栗縣">苗栗縣</option>
                <option value="彰化縣">彰化縣</option>
                <option value="南投縣">南投縣</option>
                <option value="雲林縣">雲林縣</option>
                <option value="台南市">台南市</option>
                <option value="高雄市">高雄市</option>
                <option value="嘉義市">嘉義市</option>
                <option value="嘉義縣">嘉義縣</option>
                <option value="屏東縣">屏東縣</option>
                <option value="花蓮縣">花蓮縣</option>
                <option value="台東縣">台東縣</option>
                <option value="澎湖縣">澎湖縣</option>
                <option value="金門縣">金門縣</option>
                <option value="連江縣">連江縣</option>
                <option value="其它地區">其它地區</option>
              </select>
            </div>
            {location && districtOptions.length > 0 && (
              <div className={styles.inputGroup}>
                <MemIcons iconName="icon-location" size="medium" />
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
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-calendar" size="medium" />
              <input
                type="date"
                placeholder="生日"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={today} // 設定生日日期最大值為今天
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.button}>
              註冊
            </button>
            <br />
            <p
              onClick={() => router.push("/member/login")}
              className={styles.loginText}
            >
              已有帳號? 前往登入
            </p>
            <br />
            <div
              onClick={() => router.push("/")}
              className={styles.createAccount}
              style={{ cursor: "pointer" }}
            >
              <MemIcons iconName="icons-home" size="medium" />
            </div>
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