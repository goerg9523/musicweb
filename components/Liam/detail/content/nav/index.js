import React, { useEffect } from "react";
import styles from "./detail-nav.module.css";
import DetailMain from "../main";
import QuestionAccordion from "../../question/question-item";
import GroupPlaneCard from "../group-plane-card";
import NewsCard from "../../new";
import Message from "../../message";
import { useTab } from "../../top/tab-Context";
import {
  CartProvider,
  useCartDetail,
} from "@/components/George/context/cartdetail-provider";

const comment = [
  {
    id: 1,
    userName: "王小明",
    userAvatar: "/avatars/user1.jpg",
    type: "提問",
    date: "2024/02/01 14:30",
    content: "請問商品什麼時候會到貨呢？",
    replies: [
      {
        id: 2,
        userName: "客服人員",
        userAvatar: "/avatars/staff1.jpg",
        type: "回覆",
        date: "2024/02/01 15:00",
        content: "您好，預計下週三到貨",
        replies: [
          {
            id: 3,
            userName: "王小明",
            userAvatar: "/avatars/user1.jpg",
            type: "回覆",
            date: "2024/02/01 15:05",
            content: "好的，謝謝！",
          },
        ],
      },
      {
        id: 4,
        userName: "李小華",
        userAvatar: "/avatars/user2.jpg",
        type: "回覆",
        date: "2024/02/01 15:30",
        content: "我也在等這個商品！",
      },
    ],
  },
  {
    id: 5,
    userName: "張三",
    userAvatar: "/avatars/user3.jpg",
    type: "建議",
    date: "2024/02/01 16:00",
    content: "希望可以增加更多顏色選擇",
    replies: [
      {
        id: 6,
        userName: "商品經理",
        userAvatar: "/avatars/staff2.jpg",
        type: "回覆",
        date: "2024/02/01 16:30",
        content: "感謝您的建議，我們會認真考慮！",
      },
    ],
  },
];

const faqData = [
  {
    id: 1,
    date: "2023/06/21 11:32",
    question: "如何於官網購物呢？還是沒看到功能？？",
    answer: "目前官網尚未開放購物功能，請密切關注我們的更新通知。",
    highlight: true,
  },
  {
    id: 2,
    date: "2023/06/21 11:45",
    question: "如果不想綁外送,是選擇自取嗎？？",
    answer: "是的，您可以選擇到店自取的方式。",
  },
  {
    id: 3,
    date: "2023/06/21 11:47",
    question: "請問可付現方式會怎樣？？",
    answer: "我們接受現金、信用卡和行動支付等方式。",
  },
];

const newsItems = [
  {
    date: "2024/02/01",
    title: "計畫更新 #3 勸世三姊妹原聲帶集資結束，非常感謝大家支持！",
    description:
      "從台中場的滿場驚呼聲當中開始，在歷經了兩個月的時間後，音樂劇《勸世三姊妹》原聲帶集資發行計畫在11月29日 23:59正式告一段落！真的非常感謝大家對集資計畫的支持與關愛，製作團隊們全都感受到了，我們帶著大家滿滿的心意與期待，持續馬不......",
    image: "/01.jpg",
  },
  {
    date: "2024/02/01",
    title: "最新公告標題",
    description: "這裡是新聞或公告的詳細描述內容...",
    image: "/02.jpg",
  },
];

export default function DetailNav() {
  const { activeTab, setActiveTab } = useTab();
  const { handleAddtoCart, setPlanCartItems, planCartItems } = useCartDetail();

  const renderContent = () => {
    switch (activeTab) {
      case "content":
        return (
          <div id="content-section">
            <DetailMain />
            <GroupPlaneCard
              handleAddtoCart={handleAddtoCart}
              setPlanCartItems={setPlanCartItems}
              planCartItems={planCartItems}
            />
          </div>
        );
      case "faq":
        return <QuestionAccordion faqData={faqData} />;
      case "news":
        return <NewsCard newsItems={newsItems} />;
      case "comments":
        return <Message comments={comment} />;
      default:
        return <DetailMain />;
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li
          className={`${styles.item} ${
            activeTab === "content" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("content")}
        >
          <h6>專案內容</h6>
        </li>
        <li
          className={`${styles.item} ${
            activeTab === "faq" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("faq")}
        >
          <h6>常見問題</h6>
        </li>
        <li
          className={`${styles.item} ${
            activeTab === "news" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("news")}
        >
          <h6>最新消息</h6>
        </li>
        <li
          className={`${styles.item} ${
            activeTab === "comments" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("comments")}
        >
          <h6>留言</h6>
        </li>
      </ul>

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}
