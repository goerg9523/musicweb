import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NewsCardItem from "./new-card-item";
import NewsCardDetailItem from "./new-card-detail-item";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './news-card.module.css';

const NewsCard = ({ newsItems }) => {
  const router = useRouter();
  const [selectedNews, setSelectedNews] = useState(null);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 每頁顯示 5 筆資料

  const handleCardClick = (index) => {
    const actualIndex = (currentPage - 1) * itemsPerPage + index;
    console.log("Card clicked:", actualIndex);
    setSelectedNews(actualIndex);
  };

  const handleBackToList = () => {
    setSelectedNews(null);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!router.isReady) return;

        const { project } = router.query;
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:3005/fundraiser/news/${project}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.rows && Array.isArray(result.rows)) {
          setNews(result.rows);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [router.isReady]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!news.length) {
    return <div className={styles.container} style={{textAlign:'center',height:'50px'}}>暫無最新消息</div>;
  }

  // 計算總頁數
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // 取得當前頁面的資料
  const currentNews = news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 處理頁面變更
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedNews(null); // 切換頁面時回到列表視圖
  };

  return (
    <div className={styles.newsContainer}>
      {selectedNews === null ? (
        <>
          <div className={styles.newsGrid}>
            {currentNews.map((item, index) => (
              <NewsCardItem
                key={index}
                date={item.f_news_current}
                title={item.f_news_title}
                description={item.f_news_content}
                image={item.f_news_picture}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>

          {/* 分頁控制 */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                <ChevronLeft size={16} />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`${styles.pageButton} ${
                    currentPage === index + 1 ? styles.activePage : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <NewsCardDetailItem
          news={news[selectedNews]}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default NewsCard;