'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Store, Check, CheckCheck, Clock, X, Loader, MessageCircle } from 'lucide-react';
import styles from './chat.module.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initialMessage = {
      id: 1,
      sender: 'store',
      content: '您好！很高興為您服務，請問有什麼需要協助的嗎？',
      time: new Date().toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'read'
    };
    setMessages([initialMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAutoResponse = (msg) => {
    const responses = {
     '你好': '您好！很高興為您服務，請問有什麼需要協助的嗎？',
  '在嗎': '您好！我在的，很抱歉讓您久等了，請問需要什麼協助？',
  '謝謝': '不客氣！很高興能幫助到您。如果還有任何問題，隨時都可以詢問。',
  '早安': '早安！希望您有愉快的一天。請問需要什麼協助嗎？',
  '午安': '午安！很高興為您服務。有什麼我可以協助您的嗎？',
  '晚安': '晚安！感謝您的支持。祝您有個美好的夜晚！',
  '掰掰': '再見！感謝您的光臨，歡迎下次再來！',
  '哈囉': '哈囉！今天過得好嗎？很高興能為您服務！',
  '嗨': '嗨！歡迎光臨，請問有什麼我可以協助您的嗎？',
  '在忙嗎': '不會忙哦！我隨時都在為您服務，請問需要什麼協助呢？',
  
  // 商品相關
  '價格': '您想詢問哪項商品的價格呢？請提供商品名稱，我會立即為您查詢。',
  '庫存': '需要為您查詢哪個商品的庫存狀況呢？',
  '折扣': '目前店內正在進行春季特賣活動，全館商品8折起！使用優惠碼「SPRING2024」還可以享有額外95折優惠。',
  '促銷': '現在有以下優惠活動：\n1. 新品9折優惠\n2. 滿3000送300\n3. 會員獨享紅利雙倍送\n請問您想了解哪個活動的詳情？',
  '規格': '請告訴我您想了解的商品名稱，我會提供完整的規格說明。',
  '材質': '我們的商品都附有詳細的材質說明，您想知道哪件商品的材質呢？',
  '尺寸': '需要為您查詢哪件商品的尺寸表嗎？我們有提供詳細的尺寸對照表。',
  '顏色': '這個商品目前有哪些顏色呢？請讓我為您查詢現有庫存的顏色選項。',
  '比較': '需要我幫您比較商品的差異嗎？請告訴我您想比較哪些商品。',
  '介紹': '請問您想了解哪個系列的商品介紹呢？我可以為您詳細說明特色。',
  '用途': '您想了解商品的使用方式嗎？我可以提供詳細的使用說明和建議。',
  '產地': '我們的商品產地資訊都有標示，您想知道哪個商品的產地呢？',
  '品牌': '我們代理多個知名品牌，需要了解哪個品牌的資訊呢？',
  
  // 運送相關
  '運費': '我們提供以下運送方式：\n1. 一般宅配：滿1000元免運費\n2. 超商取貨：60元\n3. 超商取貨付款：65元',
  '配送': '一般訂單我們會在1-3個工作天內寄出，寄出後會立即提供追蹤碼給您。',
  '寄送': '請問您希望使用哪種寄送方式呢？我們提供宅配和超商取貨兩種選擇。',
  '到貨': '正常情況下，出貨後：\n1. 宅配約1-2天到貨\n2. 超商取貨約2-3天\n3. 離島地區約3-5天',
  '物流': '我們合作的物流公司有：\n1. 黑貓宅急便\n2. 全家便利商店\n3. 7-11超商\n4. 萊爾富',
  '追蹤': '請提供您的訂單編號，我會立即為您查詢包裹的即時位置。',
  '自取': '自取服務時間為週一至週五 10:00-18:00，請先來電預約。',
  '包裹遺失': '非常抱歉造成您的困擾！請提供訂單編號，我們會立即與物流公司確認並協助處理。',
  '超商店號': '請問您要寄送到哪個超商？我可以協助您查詢最近的門市店號。',
  '換店': '需要更改取貨門市嗎？請提供訂單編號，我們會協助您處理。',
  '出貨通知': '當商品出貨時，我們會發送出貨通知信給您，並提供追蹤碼。',
  
  // 付款相關
  '付款方式': '我們提供以下付款方式：\n1. 信用卡\n2. ATM轉帳\n3. 超商代碼\n4. 超商取貨付款',
  '分期': '刷卡分期目前提供3期、6期、12期，且支援各大銀行信用卡。',
  '發票': '請問您需要開立統編嗎？我們提供電子發票，可以載具載入或是寄送至您的信箱。',
  '轉帳': '選擇ATM轉帳時，系統會提供專屬虛擬帳號，請在24小時內完成繳款。',
  '退款': '退款會依據您的原付款方式進行退款，一般作業時間為3-7個工作天。',
  '付款失敗': '請您確認以下問題：\n1. 信用卡額度是否足夠\n2. 卡片是否過期\n3. 輸入資料是否正確',
  '刷卡問題': '刷卡發生問題了嗎？請提供交易時間與金額，我們會協助您查詢。',
  '發票作廢': '需要作廢發票嗎？請提供發票號碼，我們會為您處理。',
  '付款證明': '需要付款證明嗎？請提供訂單編號，我們會為您開立付款證明。',
  '發票時間': '電子發票會在商品出貨後24小時內開立，並寄送至您的信箱。',
  
  // 售後服務
  '退換貨': '本店提供7天鑑賞期，商品如有問題，請保持商品完整性，並拍照記錄，我們會協助您處理退換貨事宜。',
  '保固': '我們所有商品都提供原廠保固，保固期限依商品類型而定，通常為1-2年不等。',
  '維修': '如果商品需要維修，請提供：\n1. 購買證明\n2. 商品序號\n3. 問題描述\n我們會協助您安排維修服務。',
  '保養': '我們有提供商品保養指南，您需要哪種商品的保養方法呢？',
  '故障': '商品發生故障時，請先：\n1. 檢查使用方式是否正確\n2. 拍攝故障狀況\n3. 聯繫客服處理',
  '維護': '定期維護可以延長商品壽命，建議您參考商品說明書的保養建議。',
  '商品損壞': '收到損壞的商品了嗎？請拍照記錄，我們會立即為您處理！',
  '使用說明': '需要商品的使用說明書嗎？我可以提供電子檔給您。',
  '保固期限': '請提供您的訂單編號，我可以協助查詢保固到期日。',
  '維修進度': '請提供維修單號，我會立即為您查詢目前的維修進度。',
  
  // 會員相關
  '註冊': '註冊會員可以享有以下權益：\n1. 生日優惠券\n2. 紅利點數\n3. 專屬活動\n需要我為您說明註冊流程嗎？',
  '登入': '登入遇到問題了嗎？請問是忘記密碼還是帳號無法使用呢？',
  '紅利': '紅利點數使用規則：\n1. 100點可折抵10元\n2. 點數有效期一年\n3. 特價商品恕不適用',
  '會員等級': '會員等級分為：\n1. 一般會員\n2. 銀卡會員\n3. 金卡會員\n4. 鑽石會員\n累積消費越多，等級越高！',
  '優惠券': '您目前的優惠券資訊，請登入會員中心查詢。如需協助使用，請告訴我優惠券序號。',
  '忘記密碼': '請使用註冊信箱申請重設密碼，我們會寄送重設連結給您。',
  '會員資料': '需要更新會員資料嗎？請登入會員中心進行修改。',
  '電子報': '想訂閱我們的電子報嗎？可以收到最新商品資訊和優惠活動！',
  '點數查詢': '請登入會員中心查詢點數，或提供會員帳號讓我幫您查詢。',
  '生日禮': '生日當月會收到專屬優惠券，請記得在期限內使用哦！',
  
  // 聯絡相關
  '客服': '我們的客服時間為週一至週五 9:00-18:00，您可以透過以下方式聯繫我們：\n1. 線上客服\n2. 客服信箱\n3. 客服專線',
  '聯絡': '您可以透過電話、Email或LINE聯繫我們，請問您想使用哪種方式？',
  '反饋': '您的意見對我們很重要！請描述您的建議，我們會認真參考改進。',
  '投訴': '非常抱歉造成您的不便，請詳細說明情況，我們會立即處理並回覆您。',
  '建議': '感謝您的建議！我們會將您的意見轉達給相關部門評估改善。',
  '電話': '我們的客服專線是：0800-888-888，服務時間為週一至週五 9:00-18:00。',
  '信箱': '我們的客服信箱是：service@example.com，我們會在24小時內回覆您。',
  'LINE': '我們的LINE官方帳號是：@example，加入好友可以收到最新優惠資訊！',
  '營業時間': '我們的營業時間為：\n週一至週五 9:00-18:00\n週六 10:00-17:00\n週日公休',
  '聯繫不到': '抱歉讓您久等了！若現在無法立即回覆，我們會盡快與您聯繫。',
  
  // 其他服務
  '訂購教學': '我可以為您說明購物流程：\n1. 選擇商品加入購物車\n2. 結帳時選擇付款及配送方式\n3. 完成訂購',
  '購物說明': '第一次在我們這購物嗎？我可以為您介紹網站的使用方式。',
  '尺寸表': '我們有提供詳細的尺寸對照表，您想查詢哪種商品的尺寸呢？',
  '商品比較': '需要比較不同商品的功能嗎？請告訴我您想比較哪些商品。',
  '試用裝': '部分商品有提供試用裝，請問您對哪項商品有興趣呢？',
  '品牌合作': '想了解品牌合作機會嗎？請將合作提案寄至我們的商務信箱。',
  '門市資訊': '我們的門市資訊如下：\n1. 台北店：台北市xx區xx路xx號\n2. 台中店：台中市xx區xx路xx號',
  '購物金': '購物金使用規則：\n1. 可折抵下次消費\n2. 有效期限3個月\n3. 不可與其他優惠併用',
  
    };

    for (const [keyword, response] of Object.entries(responses)) {
      if (msg.toLowerCase().includes(keyword)) {
        return response;
      }
    }
    return '感謝您的詢問！我們會盡快為您處理。請問還有什麼需要協助的嗎？';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: newMessage,
      time: getCurrentTime(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? {...msg, status: 'read'} : msg
        )
      );

      const storeResponse = {
        id: Date.now() + 1,
        sender: 'store',
        content: getAutoResponse(newMessage),
        time: getCurrentTime(),
        status: 'read'
      };

      setIsTyping(false);
      setMessages(prev => [...prev, storeResponse]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className={styles.fixedContainer}>
      <div className={`${styles.container} ${!isOpen ? styles.containerHidden : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Store className={styles.storeIcon} />
            <div>
              <h1 className={styles.headerTitle}>客服聊天室</h1>
              <div className={styles.statusContainer}>
                <div className={styles.statusDot} />
                <span className={styles.statusText}>
                  {isTyping ? '正在輸入...' : '在線'}
                </span>
              </div>
            </div>
          </div>
          <button 
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="關閉聊天"
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.messagesArea}>
          {messages.map((message) => (
            <div key={message.id} 
                 className={`${styles.messageRow} ${
                   message.sender === 'user' ? styles.messageRowUser : ''
                 }`}>
              <div className={styles.avatar}>
                {message.sender === 'user' ? 
                  <User className={styles.avatarIcon} /> : 
                  <Store className={styles.avatarIcon} />
                }
              </div>
              <div className={`${styles.messageBubble} ${
                message.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleStore
              }`}>
                <p className={styles.messageText}>{message.content}</p>
                <div className={styles.messageTime}>
                  <Clock className={styles.timeIcon} />
                  <span>{message.time}</span>
                  {message.sender === 'user' && (
                    message.status === 'read' 
                      ? <CheckCheck className={styles.statusIcon} />
                      : <Check className={styles.statusIcon} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <form onSubmit={handleSendMessage} className={styles.inputForm}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="輸入訊息..."
              className={styles.textInput}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isSending}
              className={`${styles.sendButton} ${isSending ? styles.loading : ''}`}
              aria-label="發送訊息"
            >
              <Send className={styles.sendButtonIcon} />
              <Loader className={`${styles.sendButtonLoading} animate-spin`} />
            </button>
          </form>
        </div>
      </div>

      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(true)}
        aria-label="開啟聊天"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatRoom;