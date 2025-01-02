import React, { useState } from "react";
import Userfront from "@userfront/core";

// 初始化 Userfront
Userfront.init("demo1234");

// Alert 元件
const Alert = ({ message }) => {
  if (!message) return null;
  return <div id="alert">{message}</div>;
};

// ResetPassword 元件
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // 處理輸入變更
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") setPassword(value);
    if (name === "passwordVerify") setPasswordVerify(value);
  };

  // 提交表單
  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlertMessage(""); // 重設提示訊息

    if (password !== passwordVerify) {
      return setAlertMessage("Passwords must match");
    }

    try {
      await Userfront.resetPassword({ password });
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  return (
    <div>
      <Alert message={alertMessage} />
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Re-type password
          <input
            name="passwordVerify"
            type="password"
            value={passwordVerify}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

// 導出 ResetPassword 元件
export default ResetPassword;
