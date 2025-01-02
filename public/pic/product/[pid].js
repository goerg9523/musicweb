import React, { useState, useEffect } from "react";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Nav from "@/components/public/nav";
import { AddToCartBar } from "@/components/public/addtocart-bar/add-to-cart";
import ProductsDetailPage from "@/components/George/products-detail/products-detail-page";
import ProductsListen from "@/components/George/products-detail/products-listen";
import SpotifyEmbedPlayer from "@/components/George/spotifyAPI/player";
import ProductsDescription from "@/components/George/products-detail/products-description";
import ProductsMore from "@/components/George/products-detail/products-more";
import OthersYouLike from "@/components/George/products-detail/products-othersYouLike";
import { useRouter } from "next/router";
import axios from "axios";
import {
  QuantityProvider,
  useQuantity,
} from "@/components/George/context/quantity-provider";
import { CartProvider } from "@/components/George/context/cartdetail-provider";
import { TabProvider } from "@/components/Liam/detail/top/tab-Context";

export default function ProductsDetail() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);
  const [albumDetail, setAlbumDetail] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [otherAlbums, setOtherAlbums] = useState([]);
  const [otherImages, setOtherImages] = useState([]);
  const [youMayLike, setYouMayLike] = useState([]);
  const router = useRouter();
  const { pid } = router.query;
  const { quantity } = useQuantity;

  useEffect(() => {
    if (!router.isReady || !pid) return;
    const fetchAlbumIdData = async () => {
      try {
        const responseAlbumsData = await axios.get(
          `http://localhost:3005/api/albums/${pid}`
        );
        // console.log("Album Data:", responseAlbumsData.data);
        setAlbumDetail(responseAlbumsData.data);
        const responseAlbumsImage = await axios.get(
          `http://localhost:3005/api/getImages/${pid}`
        );
        // console.log("Album Images:", responseAlbumsImage.data);
        setAlbumImages(responseAlbumsImage.data);
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };

    fetchAlbumIdData();
  }, [router.isReady, pid]);

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

  useEffect(() => {
    const fetchOtherAlbums = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/otheralbums/${albumDetail.p_albums_artist}/${albumDetail.p_albums_id}`
        );
        setOtherAlbums(response.data);
      } catch (error) {
        console.error("無法取得同歌手的專輯", error);
      }
    };

    if (albumDetail) {
      fetchOtherAlbums();
    }
  }, [albumDetail]);

  useEffect(() => {
    if (albumDetail?.p_albums_artist) {
      const fetchOtherImages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3005/api/getImages/${albumDetail.p_albums_artist}/${albumDetail.p_albums_id}`
          );
          setOtherImages(response.data);
        } catch (error) {
          console.error("Error fetching other images:", error);
        }
      };

      fetchOtherImages();
    }
  }, [albumDetail]);

  useEffect(() => {
    const fetchYouMayLike = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/youmaylike/${pid}`
        );
        setYouMayLike(response.data);
      } catch (error) {
        console.error("無法取得你可能也喜歡的其他專輯", error);
      }
    };
    fetchYouMayLike();
  }, [pid]);

  // useEffect(() => {
  //   console.log("你可能也喜歡: ", pid);
  // }, [pid]);

  return (
    <>
      <Nav />
      <TabProvider>
        <QuantityProvider>
          <CartProvider albumDetail={albumDetail} albumImages={albumImages}>
            <ProductsDetailPage
              albumDetail={albumDetail}
              albumImages={albumImages}
              pid={pid}
            />
            {/* <SpotifyEmbedPlayer /> */}
            <ProductsListen />
            <ProductsDescription
              albumDetail={albumDetail}
              albumImages={albumImages}
              pid={pid}
            />
            <ProductsMore
              albumDetail={albumDetail}
              albumImages={albumImages}
              otherAlbums={otherAlbums}
              otherImages={otherImages}
            />
            <OthersYouLike
              albumDetail={albumDetail}
              albumImages={albumImages}
              youMayLike={youMayLike}
            />
            <AddToCartBar />
          </CartProvider>
        </QuantityProvider>
      </TabProvider>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
