// CommentModal.jsx
import React, { useState, useEffect } from 'react';
import { CiChat1 } from "react-icons/ci";
import { Check } from "lucide-react";
import styles from './contact-Icon.module.css';

const CommentModal = ({ authorInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 封鎖所有可能的滾動
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (isOpen) {
      // 禁止滾動 body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`; // 記住滾動位置
      
      // 禁止觸控滾動
      document.addEventListener('touchmove', preventScroll, { passive: false });
      // 禁止滾輪滾動
      document.addEventListener('wheel', preventScroll, { passive: false });
      // 禁止鍵盤滾動
      document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
          e.preventDefault();
        }
      });
    } else {
      // 恢復滾動並回到原來的位置
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      
      // 移除事件監聽
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
    }

    return () => {
      // 清理函數
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 模擬提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // 顯示成功動畫後關閉
      setTimeout(() => {
        setShowSuccess(false);
        setComment('');
        setIsOpen(false);
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      // 這裡可以加入錯誤處理
    }
  };

  // Modal 內容點擊事件處理
  const handleModalClick = (e) => {
    e.stopPropagation(); // 防止點擊事件冒泡到遮罩層
  };

  // 遮罩層點擊事件處理
  const handleOverlayClick = () => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.iconWrapper}>
      <CiChat1 
        className={styles.chatIcon}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div 
          className={styles.modalOverlay}
          onClick={handleOverlayClick}
        >
          <div 
            className={styles.modalContent}
            onClick={handleModalClick}
          >
            {/* 作者資訊區域 */}
            <div className={styles.authorSection}>
              <div className={styles.authorInfo}>
                <img 
                  src={authorInfo?.avatar || '/s_img/streamer2.jpg'} 
                  alt="作者頭像"
                  className={styles.authorAvatar}
                />
                <div className={styles.authorDetails}>
                  <h3 className={styles.authorName}>{authorInfo?.name || '作者名稱'}</h3>
                  <span className={styles.authorTitle}>{authorInfo?.title || '職稱'}</span>
                </div>
              </div>
              <button 
                onClick={() => !isSubmitting && setIsOpen(false)}
                className={styles.closeButton}
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>

            {/* 留言表單 */}
            <form onSubmit={handleSubmit} className={styles.commentForm}>
              <textarea
                className={styles.commentInput}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="請輸入您的留言..."
                required
                disabled={isSubmitting}
              />
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
              >
                {showSuccess ? (
                  <div className={styles.successMessage}>
                    <Check size={20} />
                    <span>已送出</span>
                  </div>
                ) : (
                  <span className={isSubmitting ? styles.hidden : ''}>
                    送出留言
                  </span>
                )}
                
                {isSubmitting && (
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentModal;