// components/home/daily/time-line.js
import React, { useState, useEffect } from 'react';
import styles from './time-line.module.css';

const TimelineComponent = ({ data, onDataChange, currentData }) => {
  // 格式化日期的函數
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `(${month}-${day})`;
  };

  // 找到當前日期在數據中的索引
  const findCurrentIndex = () => {
    return data.findIndex(item => 
      new Date(item.date).getDate() === new Date(currentData.date).getDate()
    );
  };

  // 處理向上點擊（查看前一天）
  const handleClickTop = () => {
    const currentIndex = findCurrentIndex();
    if (currentIndex > 0) {
      onDataChange(data[currentIndex - 1]);
    }
  };

  // 處理向下點擊（查看後一天）
  const handleClickBottom = () => {
    const currentIndex = findCurrentIndex();
    if (currentIndex < data.length - 1) {
      onDataChange(data[currentIndex + 1]);
    }
  };

  // 獲取前一天的日期顯示
  const getPreviousDate = () => {
    const currentIndex = findCurrentIndex();
    if (currentIndex > 0) {
      return formatDate(data[currentIndex - 1].date);
    }
    return null;
  };

  // 獲取後一天的日期顯示
  const getNextDate = () => {
    const currentIndex = findCurrentIndex();
    if (currentIndex < data.length - 1) {
      return formatDate(data[currentIndex + 1].date);
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {/* 上一天按鈕 */}
        {getPreviousDate() && (
          <div 
            onClick={handleClickTop}
            className={styles.compactBlock}
          >
            <div className={styles.compactDate}>
              {getPreviousDate()}
            </div>
          </div>
        )}

        {/* 當前日期區塊 */}
        <div className={styles.expandedBlock}>
          <div className={styles.expandedDate}>
            {formatDate(currentData.date)}
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.content}>
              {currentData.content}
            </div>
            <div className={styles.description}>
              {currentData.description}
            </div>
          </div>
        </div>

        {/* 下一天按鈕 */}
        {getNextDate() && (
          <div 
            onClick={handleClickBottom}
            className={styles.compactBlock}
          >
            <div className={styles.compactDate}>
              {getNextDate()}
            </div>
          </div>
        )}
        <div className={styles.detail}>
          <a href="#" >詳細內容</a>
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;