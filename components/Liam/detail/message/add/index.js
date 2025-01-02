import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './feedback.module.css';
import { useAuth } from "@/Context/auth-context"; // 使用 useAuth
import axios from "axios";

const PurchaseFeedback = ({ projectId, orderId }) => {
  const { auth } = useAuth(); // 獲取 auth 內容

  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);
  const [member, setMember] = useState(null);
  const [feedbackData, setFeedbackData] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 檢查會員登入狀態和購買狀態
  useEffect(() => {
    const checkEligibility = async () => {
      try {
        // 檢查會員狀態
        const memberResponse = await fetch('http://localhost:3005/mem-data', {
          credentials: 'include'
        });
        const memberData = await memberResponse.json();
        
        if (!memberData.admin) {
          setError('請先登入會員');
            window.location='http://localhost:3000/login'
          return;
        }
        setMember(memberData.admin);

        // 檢查訂單狀態
        const orderResponse = await fetch(`http://localhost:3005/order/check/${orderId}`, {
          credentials: 'include'
        });
        const orderData = await orderResponse.json();

        if (orderData.status === 'success') {
          setShowFeedback(true);
        }
      } catch (error) {
        console.error('Error checking eligibility:', error);
        setError('系統錯誤，請稍後再試');
      }
    };

    checkEligibility();
  }, [orderId]);

  // 處理留言提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3005/fundraiser/message/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          f_project_id: projectId,
          f_member_id: member.member_id,
          f_message_title: feedbackData.title,
          f_message_content: feedbackData.content,
          f_message_current: new Date().toISOString(),
          f_message_floor: null, // 由後端生成
          f_sale: 0 // 一般用戶留言
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('感謝您的回饋！');
        router.reload(); // 重新載入頁面以顯示新留言
      } else {
        setError(data.message || '提交失敗，請稍後再試');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('系統錯誤，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showFeedback) {
    return error ? <div className={styles.error}>{error}</div> : null;
  }

  return (
    <div className={styles.feedbackContainer}>
      <h3 className={styles.feedbackTitle}>感謝您的購買！歡迎分享您的想法</h3>
      
      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">標題</label>
          <input
            type="text"
            id="title"
            value={feedbackData.title}
            onChange={(e) => setFeedbackData(prev => ({
              ...prev,
              title: e.target.value
            }))}
            required
            maxLength={50}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">內容</label>
          <textarea
            id="content"
            value={feedbackData.content}
            onChange={(e) => setFeedbackData(prev => ({
              ...prev,
              content: e.target.value
            }))}
            required
            maxLength={500}
            rows={4}
            className={styles.textarea}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => setShowFeedback(false)}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            稍後再說
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? '提交中...' : '提交留言'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseFeedback;