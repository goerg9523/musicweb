import React, { useState, useEffect } from "react";
import styles from "./form-option.module.css";

const districts = {
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

const Dropdown = ({ type, initialValue={}, onChange, sizeType }) => {
  const [selectedCounty, setSelectedCounty] = useState(initialValue.county || "");
  const [selectedDistrict, setSelectedDistrict] = useState(initialValue.district || "");
  const [selectedGender, setSelectedGender] = useState(initialValue || "");


  useEffect(() => {
    if (type === "region") {
      setSelectedCounty(initialValue.county || "");
      setSelectedDistrict(initialValue.district || "");
    } else if (type === "gender") {
      setSelectedGender(initialValue || "");
    }
  }, [initialValue, type]);

  const handleCountyChange = (event) => {
    const county = event.target.value;
    setSelectedCounty(county);
    setSelectedDistrict(""); // 重置行政區選擇
    onChange({ county, district: "" });
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    onChange({ county: selectedCounty, district });
  };

  const handleGenderChange = (event) => {
    const gender = event.target.value;
    setSelectedGender(gender);
    onChange(gender); // 回傳性別選項
  };

  const sizeClass =
    sizeType === "x-small" ? styles.sizeXS :
    sizeType === "small" ? styles.sizeS :
    sizeType === "medium" ? styles.sizeM :
    sizeType === "large" ? styles.sizeL : "";

    return (
      <div>
        {type === "gender" ? (
          <select
            className={`${styles.genderDropdown} ${sizeClass}`}
            value={selectedGender}
            onChange={handleGenderChange}
          >
            <option value="">請選擇</option>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="不透露">不透露</option>
          </select>
        ) : (
          <>
            <select
              className={`${styles.regionDropdown} ${sizeClass}`}
              value={selectedCounty}
              onChange={handleCountyChange}
            >
              <option value="">請選擇縣市</option>
              {Object.keys(districts).map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
            {selectedCounty && (
              <select
                className={`${styles.regionDropdown} ${sizeClass}`}
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">請選擇行政區</option>
                {districts[selectedCounty].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            )}
          </>
        )}
      </div>
    );
  };
  
  export default Dropdown;