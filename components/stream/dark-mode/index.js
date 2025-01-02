import React, { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const MobileDarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (prefersDark) {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }

    // Handle responsive layout
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute(
      "data-theme",
      newMode ? "dark" : "light"
    );
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const baseButtonStyle = {
    position: "fixed",
    zIndex: 1001,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    borderRadius: "50%",
  };

  const mobileStyle = {
    ...baseButtonStyle,
    top: "50px",
    right: "20px",
    width: "48px", // Larger touch target for mobile
    height: "48px",
  };

  const desktopStyle = {
    ...baseButtonStyle,
    top: "100px",
    left: "20px",
    width: "40px",
    height: "40px",
  };

  const buttonStyle = isMobile ? mobileStyle : desktopStyle;

  const iconStyle = {
    width: isMobile ? "24px" : "20px",
    height: isMobile ? "24px" : "20px",
  };

  return (
    <button
      onClick={toggleDarkMode}
      style={buttonStyle}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun style={iconStyle} /> : <Moon style={iconStyle} />}
    </button>
  );
};

export default MobileDarkModeToggle;
