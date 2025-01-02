import React, { useState, useRef } from "react";
import styles from "./ContractForm.module.css";
import ProjectSystem from "./ProjectForm";

const ContractForm = ({ setDisplay }) => {
  const [showForm, setShowForm] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = (e) => {
    const element = e.target;
    const reachedBottom =
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 1;

    if (reachedBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAgree = () => {
    setIsAgreed(true);
  };

  const handleSubmit = () => {
    console.log(123);

    if (isAgreed) {
      console.log("表單已提交");
      setDisplay(false);
      // location.href('lo')
    }
  };

  return (
    <div className={styles.container}>
      {!showForm ? (
        <button className={styles.showButton} onClick={() => setShowForm(true)}>
          {/* <span className={styles.buttonIcon}>📜</span> */}
          (開始募資專輯)
        </button>
      ) : (
        <div className={styles.card}>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className={styles.content}
          >
            <h2 className={styles.title}>服務條款與合約</h2>
            <div className={styles.terms}>
              <h6>一、服務內容</h6>
              <p>1.1 本合約旨在規範用戶使用本平台服務時的權利與義務。</p>
              <p>1.2 用戶需要遵守平台的相關規定和政策。</p>
              <h6>二、用戶責任</h6>
              <p>2.1 用戶應確保提供的信息真實準確。</p>
              <p>2.2 用戶應妥善保管帳號密碼。</p>
              <h6>三、隱私保護</h6>
              <p>3.1 平台承諾保A護用戶的個人信息安全。</p>
              <p>3.2 未經用戶同意，不會向第三方披露用戶信息。</p>
              <h6>四、智慧財產權</h6>
              <p>4.1 平台上的內容受智慧財產權法保護。</p>
              <p>4.2 未經授權，用戶不得複製或傳播平台內容。</p>
              <h6>五、免責聲明</h6>
              <p>5.1 平台不對用戶間的交易承擔責任。</p>
              <p>5.2 因不可抗力導致的服務中斷，平台不承擔責任。</p>
              <h6>六、合約終止</h6>
              <p>6.1 用戶可隨時終止使用平台服務。</p>
              <p>6.2 如用戶違反合約規定，平台有權終止服務。</p>
              <h6>七、募資規則</h6>
              <p>7.1 創作者必須在規定時間內完成募資目標。</p>
              <p>7.2 募資金額未達標時，平台將全額退款給贊助者。</p>
              <p>7.3 募資專案上線後，不得任意更改回饋內容。</p>
              <h6>八、付款條款</h6>
              <p>8.1 平台收取募資總金額的 10% 作為服務費用。</p>
              <p>8.2 募資成功後，款項將於 14 個工作天內匯入創作者帳戶。</p>
              <p>8.3 若發生退款爭議，平台有權暫停款項撥付。</p>
              <h6>九、作品發行</h6>
              <p>9.1 創作者應依照募資計畫時程發行作品。</p>
              <p>9.2 若無法如期發行，須提前告知贊助者並說明原因。</p>
              <p>9.3 嚴重延遲發行可能導致專案終止並全額退款。</p>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.agreeButton} ${
                isAgreed ? styles.agreed : ""
              }`}
              disabled={!hasScrolledToBottom}
              onClick={handleAgree}
            >
              <span className={styles.buttonIcon}>✓</span>
              {isAgreed ? "已同意條款" : "同意條款"}
            </button>

            <button
              className={`${styles.button} ${styles.submitButton}`}
              disabled={!isAgreed}
              onClick={() => {
                handleSubmit();
                // setDisplay(true)
              }}
            >
              創建專案
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractForm;
