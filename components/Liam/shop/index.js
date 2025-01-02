const renderShopOrder = (order) => (
  <div key={order.p_order_id} className="order-card">
    <div className="order-header">
      <div className="header-left">
        <div className="order-id">
          訂單編號：{order.p_order_orderNumber}
        </div>
        <div className="order-date">
          {formatDate(order.p_order_created_at)}
        </div>
      </div>
      <span className={`order-status ${order.p_order_status}`}>
        {getStatusDisplay(order.p_order_status)}
      </span>
    </div>

    <div className="order-details">
      {/* 商品明細 */}
      {JSON.parse(order.details).map((item, index) => (
        <div key={index} className="product-item">
          <div className="product-name">{item.name}</div>
          <div className="product-info">
            <span>數量：{item.quantity}</span>
            <span>單價：${item.price}</span>
            <span>小計：${item.subtotal}</span>
          </div>
        </div>
      ))}
      
      {/* 訂單資訊 */}
      <div className="shipping-info">
        <div>配送地址：{order.p_order_shipping_address}</div>
        <div>運費：${order.p_order_shipping_fee}</div>
      </div>
      
      <div className="contact-info">
        <div>聯絡電話：{order.p_order_phone}</div>
        <div>電子郵件：{order.p_order_email}</div>
      </div>
    </div>

    <div className="order-footer">
      <div className="order-status-info">
        <div>付款狀態：{getPaymentStatus(order.p_order_payment_status)}</div>
        <div>最後更新：{formatDate(order.p_order_updated_at)}</div>
      </div>
      <div className="total-amount">
        總金額：${order.p_order_total_amount}
      </div>
    </div>

    <style jsx>{`
      .order-card {
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
      }

      .header-left {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .order-id {
        font-weight: 600;
      }

      .order-date {
        font-size: 14px;
        color: #666;
      }

      .order-status {
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
      }

      .order-details {
        padding: 16px 0;
      }

      .product-item {
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px dashed #eee;
      }

      .product-name {
        font-weight: 500;
        margin-bottom: 8px;
      }

      .product-info {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #666;
      }

      .shipping-info,
      .contact-info {
        margin-top: 16px;
        font-size: 14px;
        color: #666;
      }

      .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #eee;
      }

      .order-status-info {
        font-size: 14px;
        color: #666;
      }

      .total-amount {
        font-size: 18px;
        font-weight: 600;
        color: #e53935;
      }

      @media (max-width: 768px) {
        .product-info {
          flex-direction: column;
          gap: 4px;
        }
      }
    `}</style>
  </div>
);

// 訂單狀態轉換函數
const getStatusDisplay = (status) => {
  return {
    'pending': '處理中',
    'processing': '準備中',
    'shipping': '運送中',
    'completed': '已完成',
    'cancelled': '已取消'
  }[status] || status;
};

// 付款狀態轉換函數
const getPaymentStatus = (status) => {
  return {
    'pending': '待付款',
    'paid': '已付款',
    'failed': '付款失敗',
    'refunded': '已退款'
  }[status] || status;
};