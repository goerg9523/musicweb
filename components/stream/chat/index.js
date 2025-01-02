import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import styles from "@/components/stream/chat/ws-client.module.css";
import { ChevronUp } from "lucide-react";

const ChatRoom = () => {
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const socketRef = useRef(null);
  const messageAreaRef = useRef(null);
  const isViewingChat = useRef(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3007", {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("connect", () => {
        console.log(
          "Connected to server with socket ID:",
          socketRef.current.id
        );
      });

      socketRef.current.on("message_history", (history) => {
        setMessages(history);
      });

      socketRef.current.on("receive_message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        if (isMobile && !isViewingChat.current) {
          setUnreadCount((prev) => prev + 1);
        }
      });

      const id = `${socketRef.current.id}-${Date.now()}`;
      setUserId(id);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle mobile chat expansion
  useEffect(() => {
    if (!isMobile) return;

    isViewingChat.current = isChatExpanded;
    if (isChatExpanded) {
      setUnreadCount(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isChatExpanded, isMobile]);

  const handleLogin = () => {
    if (nickname.trim() && socketRef.current) {
      setIsLoggedIn(true);
      socketRef.current.emit("user_join", {
        userId,
        nickname,
        timestamp: new Date().toISOString(),
      });
      // Don't automatically expand chat after login
      // Let user click toggle to expand
    }
  };

  const sendMessage = () => {
    if (message.trim() && socketRef.current) {
      const messageData = {
        userId,
        nickname,
        text: message,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.emit("send_message", messageData);
      setMessage("");
    }
  };

  const toggleChat = () => {
    if (isMobile) {
      setIsChatExpanded(!isChatExpanded);
    }
  };

  const renderChatContent = () => (
    <div className={styles.chatContainer}>
      {!isMobile && <div className={styles.header}>聊天室</div>}
      <div ref={messageAreaRef} className={styles.messageArea}>
        {messages.map((msg, index) => (
          <div key={`${msg.userId || "system"}-${index}`}>
            {msg.type === "system" ? (
              <div className={styles.systemMessage}>{msg.text}</div>
            ) : (
              <div className={styles.messageRow}>
                <div className={styles.username}>
                  {msg.userId === userId ? "You" : msg.nickname}
                </div>
                <div className={styles.message}>{msg.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="輸入聊天訊息"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          送出
        </button>
      </div>
    </div>
  );

  // For desktop view
  if (!isMobile) {
    return (
      <div style={{ verticalAlign: "top", marginTop: "3rem" }}>
        <div className={styles.container}>
          {!isLoggedIn ? (
            <div className={styles.loginContainer}>
              <input
                type="text"
                placeholder="請問怎麼稱呼"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={styles.loginInput}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button onClick={handleLogin} className={styles.loginButton}>
                加入聊天室
              </button>
            </div>
          ) : (
            renderChatContent()
          )}
        </div>
      </div>
    );
  }

  // For mobile view
  return (
    <div
      className={`${styles.container} ${
        !isChatExpanded ? styles.containerCollapsed : ""
      }`}
    >
      <div className={styles.chatToggle} onClick={toggleChat}>
        <div className={styles.chatToggleTitle}>
          聊天室
          {!isChatExpanded && unreadCount > 0 && isLoggedIn && (
            <span className={styles.messageCounter}>{unreadCount}</span>
          )}
        </div>
        <ChevronUp
          className={`${styles.toggleIcon} ${
            isChatExpanded ? styles.toggleIconOpen : ""
          }`}
          size={20}
        />
      </div>

      {isChatExpanded &&
        (!isLoggedIn ? (
          <div className={styles.loginContainer}>
            <input
              type="text"
              placeholder="請問怎麼稱呼"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles.loginInput}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button onClick={handleLogin} className={styles.loginButton}>
              加入聊天室
            </button>
          </div>
        ) : (
          renderChatContent()
        ))}
    </div>
  );
};

export default ChatRoom;
