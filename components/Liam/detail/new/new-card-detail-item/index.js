import React from 'react';
import styles from './new-card-detail-item.module.css';
import { ArrowLeft } from 'lucide-react';

const NewsCardDetailItem = ({ news, onBack }) => {
  if (!news) return null; // 添加防護檢查

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={onBack}>
        <ArrowLeft size={20} />
        返回
      </button>
      
      <span className={styles.date}>
        {news.f_news_current && new Date(news.f_news_current).toLocaleDateString()}
      </span>
      
      <div className={styles.imageWrapper}>
        {news.f_news_picture && (
          <img src={news.f_news_picture} alt={news.f_news_title} className={styles.image} />
        )}
      </div>

      <article className={styles.content}>
        <h4 className={styles.title}>{news.f_news_title}</h4>
        <div className={styles.description}>{news.f_news_content}</div>
        {news.f_news_detail && (
          <div className={styles.detail}>{news.f_news_detail}</div>
        )}
      </article>
    </div>
  );
};

export default NewsCardDetailItem;