import React, { useState, useRef, useEffect } from 'react';
import { Search, Image, Smile, PaperClip, Send, AlertTriangle } from 'lucide-react';
import styles from './shope.module.css';

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const ShopeeChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'djbcard',
      avatar: '/api/placeholder/32/32',
      date: '23/06/13',
      messages: [
        {
          id: 1,
          type: 'text',
          content: '子榮要幫型，遠揚「三聯式發票(公司行號)」填寫即可。',
          sender: 'user',
          time: '10:17',
        },
        {
          id: 2,
          type: 'notice',
          content: '🔔 請將交易詳話寫在 備註，買賣請誠信參考🔺 ❗️ 小心買家詐騙',
          time: '10:17',
        },
        {
          id: 3,
          type: 'green',
          content: '拒款要開始下錯',
          sender: 'store',
          time: '10:18',
        },
        {
          id: 4,
          type: 'green',
          content: '後面那筆是我要的',
          sender: 'store',
          time: '10:18',
        },
        {
          id: 5,
          type: 'text',
          content: '恩恩好的',
          sender: 'user',
          time: '10:39',
        }
      ],
      isRead: true
    },
    {
      id: 2,
      name: 'paperer',
      avatar: '/api/placeholder/32/32',
      date: '23/05/11',
      messages: [
        {
          id: 1,
          type: 'text',
          content: '[貼圖]',
          sender: 'user',
          time: '15:30'
        }
      ],
      isRead: false
    },
    // 其他聊天記錄...
  ]);

  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      type: 'text',
      content: newMessage,
      sender: 'user',
      time: formatTime(new Date()),
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: [...chat.messages, newMsg] }
          : chat
      )
    );
    setNewMessage('');
  };

  return (
    <div className={styles.container}>
      {/* 左側聊天列表 */}
      <div className={styles.sidebar}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="搜尋" 
            className={styles.searchInput}
          />
          <select className={styles.filterSelect}>
            <option>全部</option>
            <option>未讀</option>
            <option>已讀</option>
          </select>
        </div>
        
        <div className={styles.chatList}>
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${selectedChat?.id === chat.id ? styles.active : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <img src={chat.avatar} alt="" className={styles.avatar} />
              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <span className={styles.chatName}>{chat.name}</span>
                  <span className={styles.chatDate}>{chat.date}</span>
                </div>
                <p className={styles.lastMessage}>
                  {chat.messages[chat.messages.length - 1]?.content}
                </p>
              </div>
              {!chat.isRead && <div className={styles.unreadDot} />}
            </div>
          ))}
        </div>
      </div>

      {/* 右側聊天視窗 */}
      {selectedChat && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.chatTitle}>
              <img src={selectedChat.avatar} alt="" className={styles.smallAvatar} />
              <span>{selectedChat.name}</span>
            </div>
          </div>

          <div className={styles.messageArea}>
            {selectedChat.messages.map(message => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.type === 'notice' ? styles.notice : 
                  message.type === 'green' ? styles.greenMessage :
                  message.sender === 'user' ? styles.sent : styles.received
                }`}
              >
                {message.type === 'notice' ? (
                  <div className={styles.noticeContent}>
                    <AlertTriangle className={styles.noticeIcon} />
                    <span>{message.content}</span>
                  </div>
                ) : (
                  <>
                    <div className={styles.messageContent}>
                      {message.content}
                    </div>
                    <div className={styles.messageTime}>{message.time}</div>
                  </>
                )}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className={styles.inputArea}>
            <div className={styles.inputButtons}>
              <button type="button" className={styles.inputButton}>
                <Image className={styles.inputIcon} />
              </button>
              <button type="button" className={styles.inputButton}>
                <Smile className={styles.inputIcon} />
              </button>
              <button type="button" className={styles.inputButton}>
                <PaperClip className={styles.inputIcon} />
              </button>
            </div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="輸入文字..."
              className={styles.messageInput}
            />
            <button 
              type="submit" 
              className={styles.sendButton}
              disabled={!newMessage.trim()}
            >
              <Send className={`${styles.sendIcon} ${newMessage.trim() ? styles.active : ''}`} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShopeeChat;