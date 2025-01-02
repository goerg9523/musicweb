import React, { useState, useEffect } from 'react';
import NavHome from './home/index';
import NavMobile from './mobile/index';

export default function NavHomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    // 定義處理螢幕寬度變化的函數
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // 初次渲染時呼叫一次以設置初始狀態
    handleResize();

    // 添加 resize 和 scroll 事件監聽器
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setIsNavVisible(window.scrollY > 30); // 當滾動超過 30px 時顯示 nav
    };
    window.addEventListener("scroll", handleScroll);

    // 移除事件監聽器以避免內存洩漏
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* <NavHome /> */}
      {isMobile ? (<NavMobile />) : (isNavVisible ? <NavHome/> : null)}
    </div>
  );
}
