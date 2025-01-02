import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/auth-context";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    console.log(auth.id);
    
    const fetchOrders = async () => {
      try {
        if (!auth.id) {
          throw new Error("請先登入");
        }

        const response = await fetch(
          `http://localhost:3005/fundraiser/api/orders/${auth.id}`
        );

        if (!response.ok) {
          throw new Error("獲取訂單失敗");
        }

        const data = await response.json();
        console.log('Orders data:', data); // 除錯用
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth.id]);

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  // 訂單狀態轉換
  const getStatusDisplay = (status) => {
    const statusMap = {
      pending: "待付款",
      paid: "已付款",
      cancelled: "已取消",
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>錯誤：{error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>目前沒有訂單</div>;
  }

  return (
    <div className="orderListContainer">
      <h2 className="title">我的訂單(募資系統)</h2>
      <div className="orderGrid">
        {orders.map((order) => {
          // 確保 details 是陣列
          const details = Array.isArray(order.details) 
            ? order.details 
            : (typeof order.details === 'string' 
                ? JSON.parse(order.details) 
                : []);

          return (
            <div key={order.f_order_id} className="orderCard">
              <div className="orderHeader">
                <span className="orderId">
                  訂單編號：{order.f_order_id}
                </span>
                <span className={`orderStatus ${order.f_order_status}`}>
                  {getStatusDisplay(order.f_order_status)}
                </span>
              </div>

              <div className="orderDetails">
                {details.map((item, index) => (
                  <div key={index} className="orderItem">
                    <span className="itemName">{item.name}</span>
                    <div className="itemInfo">
                      <span>數量：{item.quantity}</span>
                      <span>單價：${item.price}</span>
                      <span>小計：${item.subtotal}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="orderFooter">
                <span className="orderDate">
                  訂購時間：{formatDate(order.f_created_at)}
                </span>
                <span className="orderTotal">
                  總金額：${order.f_total_amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .orderListContainer {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .orderGrid {
          
        }

        .orderCard {
          margin-bottom:10px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          background: white;
          {/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); */}
        }

        .orderHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .orderId {
          font-weight: 500;
          color: #666;
        }

        .orderStatus {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          background: #e8f5e9;
          color: #2e7d32;
        }

        .orderStatus.pending {
          background: #00ff4c;
          color: #333;
        }

        .orderStatus.cancelled {
          background: #ffebee;
          color: #f9f9f9;
        }

        .orderDetails {
          padding: 15px 0;
        }

        .orderItem {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px dashed #eee;
        }

        .itemName {
          display: block;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .itemInfo {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666;
        }

        .orderFooter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }

        .orderDate {
          font-size: 14px;
          color: #666;
        }

        .orderTotal {
          font-weight: bold;
          color: #333;
        }

        @media (max-width: 768px) {
          .orderGrid {
            grid-template-columns: 1fr;
          }

          .itemInfo {
            flex-direction: column;
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderList;