import React, { useState, useEffect } from "react";
import FooterDeskTop from "@/components/George/george-components/footer/desktop";
import FooterMobile from "@/components/George/george-components/footer/mobile";
import Nav from "@/components/George/george-components/nav";
import ProductsCart from "@/components/George/products-cart-checkout/products-cart";
import { QuantityProvider } from "@/components/George/context/quantity-provider";
import { CartProvider } from "@/components/George/context/cartdetail-provider";
import useFetchDB from "@/components/George/hooks/usefetchDB";
import { useRouter } from "next/router";


export default function ProductsCartPage(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);
  const { memData } = useFetchDB();
  const router = useRouter();
  const { urid } = router.query;



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
      <QuantityProvider>
        <CartProvider>
          <ProductsCart />
        </CartProvider>
      </QuantityProvider>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
