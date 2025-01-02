import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import styles from './line.module.css';

const LinePayDemo = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // 模擬支付過程
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          Line Pay
        </div>
      </div>
      
      {!success ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>付款金額</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>NT$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={styles.input}
                placeholder="請輸入金額"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? (
              <>
                <Loader2 className={styles.loadingSpinner} size={20} />
                處理中...
              </>
            ) : (
              '確認付款'
            )}
          </button>
        </form>
      ) : (
        <div className={styles.successMessage}>
          <div className={styles.successTitle}>付款成功！</div>
          <div className={styles.successAmount}>
            交易金額: NT$ {amount}
          </div>
          <button
            onClick={() => {
              setSuccess(false);
              setAmount('');
            }}
            className={styles.button}
          >
            返回
          </button>
        </div>
      )}
    </div>
  );
};

export default LinePayDemo;