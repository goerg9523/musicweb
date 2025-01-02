import React, { useState, useEffect } from "react";
import Heart from "@/components/public/hearts";
import ShareIcon from "@/components/public/icons/share_icon";
import { Flag } from "lucide-react";

// Custom hook for window width
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

const ForumPost = ({
  id = 4,
  userImage = "/s_img/forum.jpg",
  username = "NatureLover",
  title = "大自然的啟示",
  content = "在繁忙的都市生活中，我們常常忽略了大自然的智慧。每一片樹葉的脈絡、每一朵花的綻放都蘊含著生命的奧秘。當我們駐足觀察，會發現自然界中存在著最完美的設計。這些啟示不僅能幫助我們更好地理解世界，也能指導我們如何更和諧地生活。",
  coverImage = "/s_img/forum-album.jpg",
  likes = 654,
  reposts = 92,
  timeStamp = new Date().toISOString().slice(0, 19).replace("T", " "),
}) => {
  const windowWidth = useWindowWidth();

  const getResponsiveStyles = (width) => {
    const baseStyles = {
      container: {
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        padding: "1.5rem",
        margin: "1rem",
        transition: "all 0.2s ease-in-out",
      },
      content: {
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
      },
      userSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
      },
      userInfo: {
        flex: 1,
      },
      userImage: {
        borderRadius: "50%",
        objectFit: "cover",
        marginRight: "1rem",
      },
      contentSection: {
        flexGrow: 1,
        width: "100%",
      },
      title: {
        fontSize: "1.1rem",
        fontWeight: "600",
        marginBottom: "0.25rem",
      },
      timestamp: {
        fontSize: "0.8rem",
        color: "#9CA3AF",
        marginBottom: "0.5rem",
      },
      text: {
        color: "#4B5563",
        marginBottom: "1rem",
        fontSize: "0.95rem",
      },
      mainContent: {
        display: "flex",
        gap: "1rem",
        marginBottom: "1rem",
      },
      textContent: {
        flex: "1",
      },
      coverImage: {
        borderRadius: "4px",
        objectFit: "cover",
      },
      interactionButtons: {
        display: "flex",
        alignItems: "center",
        gap: "2rem",
      },
      button: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "#6B7280",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "0.25rem",
      },
      buttonCount: {
        fontSize: "0.9rem",
        color: "#9CA3AF",
      },
    };

    // Desktop (>= 1024px)
    if (width >= 1024) {
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          width: "calc(100% - 2rem)",
          display: "inline-block",
          verticalAlign: "top",
        },
        userImage: {
          ...baseStyles.userImage,
          width: "48px",
          height: "48px",
        },
        coverImage: {
          ...baseStyles.coverImage,
          width: "180px",
          height: "180px",
        },
        mainContent: {
          ...baseStyles.mainContent,
          flexDirection: "row",
        },
      };
    }
    // Tablet (>= 768px)
    else if (width >= 768) {
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          width: "calc(100% - 2rem)",
        },
        userImage: {
          ...baseStyles.userImage,
          width: "40px",
          height: "40px",
        },
        coverImage: {
          ...baseStyles.coverImage,
          width: "160px",
          height: "160px",
        },
        mainContent: {
          ...baseStyles.mainContent,
          flexDirection: "row",
        },
      };
    }
    // Mobile (< 768px)
    else {
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          width: "calc(100% - 2rem)",
          padding: "1rem",
        },
        userImage: {
          ...baseStyles.userImage,
          width: "36px",
          height: "36px",
        },
        mainContent: {
          ...baseStyles.mainContent,
          flexDirection: "column",
        },
        coverImage: {
          ...baseStyles.coverImage,
          width: "100%",
          height: "200px",
        },
        interactionButtons: {
          ...baseStyles.interactionButtons,
          gap: "1rem",
        },
      };
    }
  };

  const styles = getResponsiveStyles(windowWidth);

  //(formatTimeStamp, hoverEffect, removeHoverEffect)
  const formatTimeStamp = (mysqlTimestamp) => {
    const date = new Date(mysqlTimestamp.replace(" ", "T"));
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const hoverEffect = (e) => {
    if (windowWidth >= 1024) {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    }
  };

  const removeHoverEffect = (e) => {
    if (windowWidth >= 1024) {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
    }
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={hoverEffect}
      onMouseLeave={removeHoverEffect}
    >
      <div style={styles.userSection}>
        <img src={userImage} alt={username} style={styles.userImage} />
        <div style={styles.userInfo}>
          <h3 style={styles.title}>{title}</h3>
          <div style={styles.timestamp}>{formatTimeStamp(timeStamp)}</div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.textContent}>
          <p style={styles.text}>{content}</p>
          <div style={styles.interactionButtons}>
            <button style={styles.button}>
              <Heart size={windowWidth < 768 ? 18 : 20} />
              <span style={styles.buttonCount}>{likes}</span>
            </button>
            <button style={styles.button}>
              <ShareIcon size={windowWidth < 768 ? 18 : 20} />
              <span style={styles.buttonCount}>{reposts}</span>
            </button>
            <button style={styles.button}>
              <Flag size={windowWidth < 768 ? 18 : 20} />
            </button>
          </div>
        </div>
        <img src={coverImage} alt="Cover" style={styles.coverImage} />
      </div>
    </div>
  );
};

export default ForumPost;
