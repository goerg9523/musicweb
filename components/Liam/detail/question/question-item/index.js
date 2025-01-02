import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './question-item.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QuestionAccordion = () => {
  const router = useRouter();
  const [openItems, setOpenItems] = useState(new Set());
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 每頁顯示 5 筆資料

  const toggleItem = (id) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!router.isReady) return;
        
        const { project } = router.query;
        setIsLoading(true);
        
        const response = await fetch(`http://localhost:3005/fundraiser/question/${project}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const result = await response.json();

        if (result.rows && Array.isArray(result.rows)) {
          setQuestion(result.rows);
        }
        
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [router.isReady]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!question.length) {
    return <div className={styles.container} style={{textAlign:'center',height:'50px'}}>暫無問答資料</div>;
  }

  // 計算總頁數
  const totalPages = Math.ceil(question.length / itemsPerPage);

  // 取得當前頁面的資料
  const currentQuestions = question.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 處理頁面變更
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOpenItems(new Set()); // 切換頁面時重置展開狀態
  };

  return (
    <div className={styles.container}>
      {/* 問答列表 */}
      {currentQuestions.map((item, i) => (
        <div 
          key={i} 
          className={styles.item}
        >
          <button
            className={styles.header}
            onClick={() => toggleItem(i)}
          >
            <div className={styles.headerContent}>
              {item.f_question_current && (
                <span className={styles.date}>
                  {new Date(item.f_question_current).toLocaleDateString()}
                </span>
              )}
              <p className={styles.question}>{item.f_question_content}</p>
            </div>
            <span className={`${styles.arrow} ${openItems.has(i) ? styles.open : ''}`}>
              ›
            </span>
          </button>
          <div 
            className={`${styles.content} ${openItems.has(i) ? styles.expanded : ''}`}
          >
            <div className={styles.answer}>
              {item.f_answer_content}
            </div>
          </div>
        </div>
      ))}

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
    </div>
  );
};

export default QuestionAccordion;