import React,{useState, useEffect} from 'react'
import FooterDeskTop from './desktop';
import FooterMobile from './mobile';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // 定義處理螢幕寬度變化的函數
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // 初次渲染時呼叫一次以設置初始狀態
    handleResize();

    // 添加事件監聽器以監測螢幕寬度變化
    window.addEventListener("resize", handleResize);

    // 清理事件監聽器以避免內存洩漏
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </div>
  )
}