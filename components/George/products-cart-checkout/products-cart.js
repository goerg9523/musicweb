import React, { useState, useEffect } from "react";
import style from "./products-cart.module.css";
import BlackWBtnsMobile from "../george-components/black_wbtns_mobile";
import { CartQuantity } from "../george-components/cart-quantity/cart-quantity";
import { CartProvider, useCartDetail } from "../context/cartdetail-provider";
import Link from "next/link";
import axios from "axios";
import ConfirmModal from "../george-components/confirm-modal/confirm-modal";

export default function ProductsCart({ mdBox, listData }) {
  const {
    selectAllItems,
    cartItems,
    handleSelectItem,
    selectedItems,
    calculateTotalAmount,
    handleIncrement,
    handleDecrement,
    showConfirm,
    confirmDelete,
    cancelDelete,
    handleDeleteClick,
    toOrder,
    calculateTotalQuantity,
  } = useCartDetail();

  const [isAllSelected, setIsAllSelected] = useState(false);
  const handleSelectAll = () => {
    const newSelectAllState = !isAllSelected;
    setIsAllSelected(newSelectAllState);
    selectAllItems(newSelectAllState);
  };

  // 全選反向判斷
  useEffect(() => {
    const allSelected =
      cartItems.length > 0 &&
      cartItems.every((item) => selectedItems.includes(item.p_albums_id));
    setIsAllSelected(allSelected);
  }, [cartItems, selectedItems]);

  const handleClick = () => {};

  return (
    <>
      <div className={style.banner}>
        <div className={style.vcover}></div>
        <video autoPlay muted loop>
          <source src="/George/1920x720-videos/v-(3).mp4" type="video/mp4" />
          你的瀏覽器不支援影片播放。
        </video>
        <div className={style.container}>
          {/* 購物車結帳流程 */}
          <div className={style.checkingout}>
            <ul className={style.checkingoutlist}>
              <li>
                <span className={`${style.procedure} ${style.proceduring}`}>1</span>
                購物車
              </li>
              <li>
                <span className={style.procedure}>2</span>結帳
              </li>
              <li>
                <span className={style.procedure}>3</span>結帳完成
              </li>
            </ul>
          </div>
  
          <div className={style.selectAll}>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll} // 全選/取消全選邏輯
            />
            <span className={style.selectWord}>全選</span>
          </div>
  
          {/* 購買細項 */}
          {cartItems &&
            cartItems.map((v, i) => {
              return (
                <div className={style.checkoutcontainer} key={i}>
                  <div className={style.checkoutcontainer1}>
                    <div className={style.checkboxandpic}>
                      <input
                        type="checkbox"
                        name="albumcheck"
                        checked={selectedItems.includes(v.p_albums_id)}
                        onChange={() => handleSelectItem(v.p_albums_id)}
                      />
                      <div className={style.albumbox}>
                        <img
                          src={`/${v.p_cart_img_filename}`}
                          alt={v.p_cart_img_filename}
                          className={style.albumpics}
                        />
                      </div>
                    </div>
                    {Array.isArray(listData.rows) &&
                      listData.rows
                        .filter((id) => v.p_albums_id === id.p_albums_id)
                        .map((album, index) => {
                          return (
                            <div
                              className={style.checkoutdescriptions}
                              key={index}
                            >
                              <div className={style.mobilecontroller}>
                                <h4 className={style.descriptionstitle}>
                                  {album.p_albums_title}
                                </h4>
                                <div className={style.descriptionsalbumname}>
                                  {album.p_albums_artist}
                                </div>
                              </div>
                              <div className={style.checkoutqpbox}>
                                <div className={style.checkoutquantity}>
                                  <CartQuantity
                                    cartItems={cartItems}
                                    handleIncrement={handleIncrement}
                                    handleDecrement={handleDecrement}
                                    albumId={album.p_albums_id}
                                    index={i}
                                    handleDeleteClick={handleDeleteClick}
                                  />
                                </div>
                                <div className={style.checkoutprice}>
                                  ${(album.p_albums_price * v.p_cart_quantity).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              );
            })}
  
          {/* separation line */}
          <div className={style.seperationline}></div>
  
          {/* total + checkout button */}
          <div className={style.totalandcheckoutbutton}>
            <div className={style.totalamount}>
              總金額({calculateTotalQuantity()}件商品)：${(calculateTotalAmount()).toLocaleString()}
            </div>
            <Link
              href={{
                pathname: "/George/cart/products-checkout-page",
                query: { toOrder: JSON.stringify(toOrder) },
              }}
            >
              <BlackWBtnsMobile
                type="2"
                onClick={handleClick}
                className={`${style.blackBtn} ${style.adjustblackbtn}`}
              >
                去結帳
              </BlackWBtnsMobile>
            </Link>
          </div>
        </div>
      </div>
      <ConfirmModal
        confirmDelete={confirmDelete}
        showConfirm={showConfirm}
        cancelDelete={cancelDelete}
      />
    </>
  );  
}
