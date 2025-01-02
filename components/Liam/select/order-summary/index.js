// components/OrderSummary.jsx

import styles from './order-summary.module.css';
const OrderSummary = ({
    products,
    quantities,
    total,
    faqs,
    expandedFaq,
    showFaqs,
    onToggleFaq,
    onToggleShowFaqs,
    onShowCart
  }) => {
    const hasItems = products.some(product => quantities[product.id] > 0);
  
    return (
      <div className={styles.rightSection}>
        <div className={styles.summary}>
          <div className={styles.summaryTitle}>訂單摘要</div>
          <div className={styles.itemList}>
            {hasItems ? (
              products.map((product) => (
                quantities[product.id] > 0 && (
                  <div key={product.id} className={styles.summaryItem}>
                    <div>
                      <div>{product.name}</div>
                      <div className={styles.priceText}>
                        ${product.price.toLocaleString()}
                      </div>
                    </div>
                    <div className={styles.summaryItemControls}>
                      <div className={styles.summaryQuantityControls}>
                        <button 
                          onClick={() => onQuantityChange(product.id, -1)}
                          className={styles.summaryQuantityButton}
                        >
                          -
                        </button>
                        <span className={styles.summaryQuantityText}>
                          {quantities[product.id] || 0}
                        </span>
                        <button 
                          onClick={() => onQuantityChange(product.id, 1)}
                          className={styles.summaryQuantityButton}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ))
            ) : (
              <div className={styles.emptyText}>
                尚未選擇商品
              </div>
            )}
          </div>
  
          <div className={styles.divider}>
            <div className={styles.totalRow}>
              <span>總計</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
  
          <div
            faqs={faqs}
            expandedFaq={expandedFaq}
            showFaqs={showFaqs}
            onToggleFaq={onToggleFaq}
            onToggleShow={onToggleShowFaqs}
          />
  
          <div className={styles.divider}>
            <button 
              className={styles.cartButton}
              onClick={onShowCart}
              disabled={!hasItems}
            >
              <div size={20} />
              加入購物車
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderSummary;