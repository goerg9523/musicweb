import React from "react";
import style from "./order-modal.module.css";

const OrderModal = ({ showModal }) => {
  if (!showModal) return false; // 如果不顯示則返回 null
  

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <p>尚未填入正確收件人資料</p>
        <div className={style.buttonContainer}>
          {/* <button onClick={confirmDelete} className={style.confirmButton}>
            確認
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
