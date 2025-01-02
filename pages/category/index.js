import React, { useState, useEffect } from "react";
import ProductsGenres from "@/components/George/cate/products-genres";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Nav from "@/components/public/nav";

export default function ProductsFilter() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);

  // 處理螢幕寬度變化
  useEffect(() => {
    // 定義處理螢幕寬度變化的函數
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    const handleScroll = () => {
      setIsNavVisible(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Nav />
      <ProductsGenres />
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
