import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./message.module.css";

import { useAuth } from "@/Context/auth-context"; // 使用 useAuth
import axios from "axios";

const CommentItem = () => {
  const router = useRouter();
  const { auth } = useAuth(); // 獲取 auth 內容

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [memberData, setMemberData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [expandedMessages, setExpandedMessages] = useState({});
  const itemsPerPage = 5;

  const organizeByFloor = (messages) => {
    const sortedMessages = [...messages].sort(
      (a, b) => a.f_message_floor - b.f_message_floor
    );

    const floorGroups = {};

    sortedMessages.forEach((message) => {
      const floor = message.f_message_floor;
      if (!floorGroups[floor]) {
        floorGroups[floor] = {
          userMessage: null,
          sellerResponse: null,
        };
      }

      if (message.f_sale === 1) {
        floorGroups[floor].sellerResponse = message;
      } else {
        floorGroups[floor].userMessage = message;
      }
    });

    return Object.entries(floorGroups).sort(
      ([floorA], [floorB]) => Number(floorA) - Number(floorB)
    );
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!router.isReady) return;

        const { project } = router.query;
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:3005/fundraiser/message/${project}`
        );
        const data = await response.json();
        const organizedComments = organizeByFloor(data.rows);
        setComments(organizedComments);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMemberData = async () => {
      if (!auth.id) return;
      
      try {
        // 獲取當前用戶ID - 使用 axios
        const response = await axios.get(
          `http://localhost:3005/member/mem-data/by-id/${auth.id}`,
          { withCredentials: true }
        );
        
        // axios 直接返回數據在 response.data 中
        const userData = response.data;
        console.log('User Data:', userData);
        
        if (userData?.memberData?.m_member_id) {
          setCurrentEditId(userData.memberData.m_member_id);
        }
    
        // 獲取所有會員資料 - 也改用 axios 保持一致
        const memberResponse = await axios.get(
          "http://localhost:3005/fundraiser/member",
          { withCredentials: true }
        );
        
        const memberData = memberResponse.data;
        console.log('Member Data:', memberData);
    
        // 將會員資料轉換為以 id 為 key 的物件
        const memberMap = {};
        if (memberData.rows) {
          memberData.rows.forEach(member => {
            memberMap[member.m_member_id] = member;
          });
        }
        
        setMemberData(memberMap);
    
      } catch (error) {
        console.error("Fetch error:", error);
        if (axios.isAxiosError(error)) {
          // 處理 Axios 特定的錯誤
          console.error('Axios Error:', error.response?.data || error.message);
        }
        setCurrentEditId(null);
      }
    };
    
    // 調用函數
    fetchMemberData();
    fetchMessages();
  }, [router.isReady]);

  const handleAddComment = async (formData) => {
    try {
      const { project } = router.query;
      
      const response = await fetch(
        `http://localhost:3005/fundraiser/message/${project}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            member_id: currentEditId,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        await refreshComments();
        setShowAddForm(false);
        setFormData({ title: "", content: "" });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = async (formData) => {
    try {
      if (!editingMessageId) return;

      const response = await fetch(
        `http://localhost:3005/fundraiser/message/${editingMessageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        await refreshComments();
        setShowEditForm(false);
        setEditingMessageId(null);
        setFormData({ title: "", content: "" });
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (messageId) => {
    if (window.confirm("確定要刪除這則留言嗎？")) {
      try {
        const response = await fetch(
          `http://localhost:3005/fundraiser/message/${messageId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          await refreshComments();
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setEditingMessageId(null);
    setFormData({ title: "", content: "" });
  };

  const refreshComments = async () => {
    try {
      const { project } = router.query;
      const response = await fetch(
        `http://localhost:3005/fundraiser/message/${project}`
      );
      const data = await response.json();
      const organizedComments = organizeByFloor(data.rows);
      setComments(organizedComments);
    } catch (error) {
      console.error("Error refreshing comments:", error);
    }
  };

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showAddForm) {
      handleAddComment(formData);
    } else if (showEditForm) {
      handleEditComment(formData);
    }
  };

  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const getCurrentPageComments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return comments.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleExpanded = (floor) => {
    setExpandedMessages(prev => ({
      ...prev,
      [floor]: !prev[floor]
    }));
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          標題：
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleLocalChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          內容：
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleLocalChange}
          className={styles.textarea}
          required
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {showAddForm ? "發布留言" : "更新留言"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.cancelButton}
        >
          取消
        </button>
      </div>
    </form>
  );

  const renderMessage = (userMessage, sellerResponse, floor) => {
    const isExpanded = expandedMessages[floor];

    return (
      <div key={floor} className={styles.floorContainer}>
        {userMessage && (
          <div className={styles.messageCard}>
            <div className={styles.messageContent}>
              <div className={styles.avatar}>會員</div>
              <div className={styles.mainContent}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    {memberData[userMessage.f_member_id]?.m_nickname || `會員 ${userMessage.f_member_id}`}
                  </span>
                  <span className={styles.messageTime}>
                    {new Date(userMessage.f_message_current).toLocaleString()}
                  </span>
                  <div className={styles.messageActions}>
                    {currentEditId === userMessage.f_member_id && (
                      <>
                        <button
                          className={styles.editButton}
                          onClick={() => {
                            setFormData({
                              title: userMessage.f_message_title,
                              content: userMessage.f_message_content,
                            });
                            setEditingMessageId(userMessage.f_message_id);
                            setShowEditForm(true);
                          }}
                        >
                          編輯
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteComment(userMessage.f_message_id)}
                        >
                          刪除
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.messageBody}>
                  <h4 className={styles.messageTitle}>
                    {userMessage.f_message_title}
                  </h4>
                  <p className={styles.messageText}>
                    {userMessage.f_message_content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {sellerResponse && (
          <>
            <div className={styles.toggleReplies}>
              <button
                onClick={() => toggleExpanded(floor)}
                className={styles.toggleButton}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="mr-1" />
                    收起賣家回覆
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1" />
                    查看賣家回覆
                  </>
                )}
              </button>
            </div>

            {isExpanded && (
              <div className={`${styles.messageCard} ${styles.replyCard} ${styles.sellerResponse}`}>
                <div className={styles.messageContent}>
                  <div className={styles.avatar}>賣家</div>
                  <div className={styles.mainContent}>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>
                        <span className={styles.customerService}>【賣家回覆】</span>
                      </span>
                      <span className={styles.messageTime}>
                        {new Date(sellerResponse.f_message_current).toLocaleString()}
                      </span>
                    </div>
                    <div className={styles.messageBody}>
                      <h4 className={styles.messageTitle}>
                        {sellerResponse.f_message_title}
                      </h4>
                      <p className={styles.messageText}>
                        {sellerResponse.f_message_content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>載入中...</p>
      </div>
    );
  }

  return (
    <div className={styles.messageContainer}>
      {currentEditId && (
        <button
          className={styles.addCommentButton}
          onClick={() => setShowAddForm(true)}
        >
          新增留言
        </button>
      )}

      {(showAddForm || showEditForm) && (
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>
            {showAddForm ? "新增留言" : "編輯留言"}
          </h3>
          {renderForm()}
        </div>
      )}

      {comments.length === 0 ? (
        <div className={styles.emptyContainer} style={{textAlign:'center',height:'50px'}}>暫無留言</div>
      ) : (
        <>
          {getCurrentPageComments().map(([floor, { userMessage, sellerResponse }]) => 
            renderMessage(userMessage, sellerResponse, floor)
          )}

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
                    currentPage === index + 1 ? styles.activePage : ""
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
      )}
    </div>
  );
};

export default CommentItem;