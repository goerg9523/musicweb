import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const LoginStatusChecker = () => {
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/check-login");
      console.log("Login Status:", response.data);
      alert(response.data.loggedIn ? "已登入" : "尚未登入");
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  return (
    <div>
      <button onClick={checkLoginStatus}>Check Login Status</button>
    </div>
  );
};

export default LoginStatusChecker;
