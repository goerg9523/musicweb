import React from "react";
import { Clock, Flame } from "lucide-react";

const SortingButton = ({ active, type, onClick, children }) => {
  const baseStyles = {
    button: {
      all: "unset",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      backgroundColor: active ? "#f3f4f6" : "transparent",
      border: "1px solid #e5e7eb",
      marginRight: "8px",
      position: "relative",
    },
    text: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: active ? "#111827" : "#6b7280",
      fontSize: "14px",
      fontWeight: active ? "600" : "400",
    },
    indicator: {
      width: "6px",
      height: "6px",
      backgroundColor: "#3b82f6",
      borderRadius: "50%",
      position: "absolute",
      top: "-3px",
      right: "-3px",
    },
  };

  return (
    <button
      style={baseStyles.button}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f3f4f6";
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      <span style={baseStyles.text}>{children}</span>
      {active && <span style={baseStyles.indicator} />}
    </button>
  );
};

export default SortingButton;
