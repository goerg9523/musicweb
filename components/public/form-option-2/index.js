import React, { useState } from "react";
import styles from "./form-option.module.css"; // 引入對應的 CSS Modules 檔案

const Dropdown = ({ type }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectionChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <select
        className={
          type === "gender" ? styles.genderDropdown : styles.regionDropdown
        }
        value={selectedValue}
        onChange={handleSelectionChange}
      >
        {type === "gender" ? (
          <>
            <option value="">請選擇</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">不透露</option>
          </>
        ) : (
          <>
            <option value="">請選擇</option>

            <option value="taipei">台北市</option>
            <option value="new_taipei">新北市</option>
            <option value="keelung">基隆市</option>
            <option value="taoyuan">桃園市</option>
            <option value="hsinchu_city">新竹市</option>
            <option value="hsinchu_county">新竹縣</option>
            <option value="yilan">宜蘭縣</option>

            <option value="taichung">台中市</option>
            <option value="miaoli">苗栗縣</option>
            <option value="changhua">彰化縣</option>
            <option value="nantou">南投縣</option>
            <option value="yunlin">雲林縣</option>

            <option value="tainan">台南市</option>
            <option value="kaohsiung">高雄市</option>
            <option value="chiayi_city">嘉義市</option>
            <option value="chiayi_county">嘉義縣</option>
            <option value="pingtung">屏東縣</option>

            <option value="hualien">花蓮縣</option>
            <option value="taitung">台東縣</option>

            <option value="penghu">澎湖縣</option>
            <option value="kinmen">金門縣</option>
            <option value="lienchiang">連江縣</option>
            <option value="other">其它地區</option>
          </>
        )}
      </select>
    </div>
  );
};

export default Dropdown;
