import React, { useEffect, useState } from "react";
import style from "./products-detail.module.css";
import WhiteWBtns from "../george-components/white_wbtns";
import BlackWBtns from "../george-components/black_wbtns";
import { Quantity } from "../george-components/quantity/quantity";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import Link from "next/link";
import { QuantityProvider, useQuantity } from "../context/quantity-provider";
import { CartProvider, useCartDetail } from "../context/cartdetail-provider";
import axios from "axios";
import useFetchDB from "@/components/George/hooks/usefetchDB";
import { BsFillCartCheckFill } from "react-icons/bs";


export default function ProductsDetailPage({
  albumDetail,
  albumImages,
}) {
  const { memAuth } = useFetchDB();
  const { handleAddtoCart, showAlert } = useCartDetail();
  const { quantity, warningText } = useQuantity();

  const handleClick = () => {
    "";
  };

  const handleAuth = () => {
    if (!memAuth) {
      alert("請先登入會員！");
      const targetUrl = encodeURIComponent(`/George/cart/${memAuth ? memAuth.id : ""}`);
      window.location = `http://localhost:3000/member/login?redirect=${targetUrl}`;
      return;
    } else {
      window.location = `http://localhost:3000/George/cart/${memAuth.id}`;
    }
  };

  // useEffect(()=>{
  //   console.log("Member: ", memAuth);
    
  // }, [memAuth])
  return (
    <>
      <div className={style.containBox}>
        <div>
          <img
            src={`/${albumImages?.images?.[0]?.p_productsimg_filename}`}
            alt="kmn"
            className={style.albumpic}
          />
        </div>
        <div className="containContent">
          {/* Title */}
          <div className={style.albumName}>{albumDetail?.p_albums_title}</div>
          {/* 商品詳細資料 */}
          <div className={style.cotent}>
            <span className={style.contentTitles}>
              <ul>
                <li>價格</li>
                <li>上架日期</li>
                <li>運送類型</li>
                <li>運送方式</li>
                <li>演唱者</li>
                <li>數量</li>
                <li>分享</li>
              </ul>
            </span>
            <span className={style.contentDetails}>
              <ul>
                <li>${parseInt(albumDetail?.p_albums_price)}</li>
                <li>
                  {albumDetail?.p_albums_release_date
                    ? albumDetail.p_albums_release_date.split("T")[0]
                    : "未提供"}
                </li>
                <li>{albumDetail?.p_albums_delivery_methods}</li>
                <li>宅配(新竹物流、Fedex)、超商(全家、7-11)</li>
                <li>{albumDetail?.p_albums_artist}</li>
                <li>{<Quantity />}</li>
                <li>
                  <FaFacebookSquare size={30} className={style.icons} />
                  <FaLine size={30} className={style.icons} />
                  <FaSquareInstagram size={30} />
                </li>
              </ul>
            </span>
          </div>

          {/* 放線線 */}
          <div className={style.seperationLine}></div>
          <div className={style.totalAmount}>
            Total Purchase Amount ${parseInt(albumDetail?.p_albums_price)}
          </div>
          <div className={style.btns}>
            {/* <Link href={`/George/cart/${urid}`}> */}
            {/* <Link href={memAuth ? `/George/cart/${memAuth.id}` : ""}> */}
            <Link href={`/George/cart/1`}>
              <BlackWBtns
                type="2"
                onClick={handleAddtoCart}
                className={style.blackBtn}
              >
                直接購買
              </BlackWBtns>
            </Link>

            <WhiteWBtns
              type="1"
              onClick={handleAddtoCart}
              className={style.whiteBtn}
            >
              加入購物車
            </WhiteWBtns>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className={`${style.alert} ${showAlert ? style.show : ""}`}>
          已加入購物車<BsFillCartCheckFill />
        </div>
      )}
    </>
  );
}
