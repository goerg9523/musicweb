import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call your server's logout endpoint to clear session on the server-side
      await axios.get("http://localhost:3005/logout", { withCredentials: true });

      // Remove any client-side session storage data, such as localStorage or cookies
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("nickname");
      localStorage.removeItem("account");

      // Redirect the user to the homepage or login page
      alert("已登出！");
      router.push("/"); // redirect to homepage or another page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      登出
    </button>
  );
};

export default Logout;
