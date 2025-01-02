import React, { useState, useEffect } from "react";
import FooterDeskTop from "@/components/George/george-components/footer/desktop";
import FooterMobile from "@/components/George/george-components/footer/mobile";
import Nav from "@/components/George/george-components/nav";
import ProductsCheckout from "@/components/George/products-cart-checkout/products-checkout";
import { CartProvider } from "@/components/George/context/cartdetail-provider";

export default function ProductsCheckoutPage(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);

  useEffect(() => {
    // 定義處理螢幕寬度變化的函數
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // 初次渲染時呼叫一次以設置初始狀態
    handleResize();

    // 添加 resize 事件監聽器
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setIsNavVisible(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // 移除事件監聽器以避免內存洩漏
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Nav />
      <CartProvider>
        <div className="video-container">
          <ProductsCheckout /> {/* 圖卡及結帳頁面內容 */}
        </div>
      </CartProvider>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
