import React, { useState, useEffect } from "react";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Nav from "@/components/public/nav";
import { AddToCartBar } from "@/components/public/addtocart-bar/add-to-cart";
import ProductsDetailPage from "@/components/George/products-detail/products-detail-page";
import ProductsListen from "@/components/George/products-detail/products-listen";
import ProductsDescription from "@/components/George/products-detail/products-description";
import ProductsMore from "@/components/George/products-detail/products-more";
import OthersYouLike from "@/components/George/products-detail/products-othersYouLike";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductsDetail() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);
  const [albumDetail, setAlbumDetail] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const router = useRouter();
  const { albumId } = router.query;

  useEffect(() => {
    if (!albumId) return;
    const fetchAlbumIdData = async () => {
      try {
        const responseAlbumsData = await axios.get(
          `http://localhost:3005/api/albums/${albumId}`
        );
        setAlbumDetail(responseAlbumsData);

        const responseAlbumsImage = await axios.get(
          `http://localhost:3005/api/getImages/${albumId}/`
        );
        setAlbumImages(responseAlbumsImage);
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };

    fetchAlbumIdData();
  }, [albumId]);

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
      <ProductsDetailPage />
      <ProductsListen />
      <ProductsDescription />
      <ProductsMore />
      <OthersYouLike />
      <AddToCartBar />
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
