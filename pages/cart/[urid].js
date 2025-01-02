import React, { useState, useEffect } from "react";
import FooterDeskTop from "@/components/George/george-components/footer/desktop";
import FooterMobile from "@/components/George/george-components/footer/mobile";
import Nav from "@/components/George/george-components/nav";
import ProductsCart from "@/components/George/products-cart-checkout/products-cart";
import { QuantityProvider } from "@/components/George/context/quantity-provider";
import { CartProvider } from "@/components/George/context/cartdetail-provider";
import useFetchDB from "@/components/George/hooks/usefetchDB";
import { TabProvider } from "@/components/Liam/detail/top/tab-Context";

export default function ProductsCartPage(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);
  const { memData, listData, mdBox } = useFetchDB();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
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

  // useEffect(() => {

  //     console.log("urid: ", listData);

  // }, [listData]);

  return (
    <>
      <Nav />
      <TabProvider>
        <QuantityProvider>
          <CartProvider mdBox={mdBox}>
            <ProductsCart mdBox={mdBox} listData={listData} />
          </CartProvider>
        </QuantityProvider>
      </TabProvider>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
