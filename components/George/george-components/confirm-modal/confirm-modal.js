import React from "react";
import style from "./confirm-modal.module.css"; // 確認樣式文件

const ConfirmModal = ({ showConfirm, confirmDelete, cancelDelete }) => {
  if (!showConfirm) return null; // 如果不顯示則返回 null
  

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <p>確認刪除此商品?</p>
        <div className={style.buttonContainer}>
          <button onClick={confirmDelete} className={style.confirmButton}>
            確認
          </button>
          <button onClick={cancelDelete} className={style.cancelButton}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
