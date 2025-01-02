import React, { useState, useEffect } from "react";
import ProductsLatestLaunched from "@/components/George/products-mall/products-latest-launched";
import ProductsRecommendation from "@/components/George/products-mall/products-recommendation";
import ProductsActivities from "@/components/George/products-mall/products-activities";
import ProductsGenres from "@/components/George/cate/products-genres";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Nav from "@/components/public/nav";
// import { AddToCartBar } from "@/components/public/addtocart-bar/add-to-cart";
// import { CartProvider } from "@/components/George/context/cartdetail-provider";
import { QuantityProvider } from "@/components/George/context/quantity-provider";

export default function ProductsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);

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
      setIsNavVisible(window.scrollY > 30); // 當滾動超過 100px 時顯示 nav
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
      <QuantityProvider>
        {/* <CartProvider> */}
        <ProductsActivities />
        <ProductsRecommendation />
        <ProductsLatestLaunched />
        {/* <AddToCartBar /> */}
        {/* </CartProvider> */}
      </QuantityProvider>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
