import React, { useState, useEffect } from "react";
import style from "./products-checkout.module.css";
import BlackWBtns from "../george-components/black_wbtns";
import { Quantity } from "../george-components/quantity/quantity";
import Link from "next/link";
import useFetchDB from "../hooks/usefetchDB";
import { useRouter } from "next/router";
import OrderModal from "../george-components/order-modal/order-modal";
import axios from "axios";
import { useCartDetail } from "../context/cartdetail-provider";
// import { useTab } from "@/components/Liam/detail/top/tab-Context";

export default function ProductsCheckout(props) {
  const router = useRouter();
  const { toOrder } = router.query;
  // const { plane } = useTab();
  const { listData } = useFetchDB();
  const { setCartItems } = useCartDetail();
  const [parsedToOrder, setParsedToOrder] = useState([]);
  // const [newcart, setNewcart ] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    payment: "",
  });
  const [errors, setErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // 資料驗證
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 即時驗證
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // 填入資料
  const handleFillField = () => {
    setFormData({
      name: "熊仔",
      phone: "0912345678",
      email: "shuan@gmail.com",
      address: "台北市大安區快樂路123號3樓",
      payment: "Link Pay",
    })
  }

  //訂編生一個
  const generateOrderNumbers = () => {
    const random = Math.floor(10000000 + Math.random() * 90000000);
    const orderNumber = `PF${random}`;
    setOrderNumber(orderNumber);
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 資料錯誤訊息
  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      return "此欄位為必填";
    }

    switch (name) {
      case "name":
        if (!/^[\u4e00-\u9fa5]{2,}$/.test(value)) {
          error = "姓名至少包含兩個中文字";
        }
        break;
      case "phone":
        if (!/^(09\d{8}|\+886\d{9})$/.test(value)) {
          error = "請輸入有效的手機號碼 ";
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/.test(value)) {
          error = "請輸入有效的電子郵件地址";
        }
        break;
      case "address":
        if (!/^[\u4e00-\u9fa5\d]{3,}$/.test(value)) {
          error = "請填寫地址";
        }
        break;
      default:
        break;
    }
    return error;
  };

  // 抓資料 from cart
  useEffect(() => {
    if (router.query.toOrder) {
      try {
        const parsed = JSON.parse(toOrder);
        const total = parsed.reduce(
          (total, v) => total + v.p_cart_price * v.p_cart_quantity,
          0
        );
        setParsedToOrder(parsed);
        setTotalAmount(total);
        generateOrderNumbers();
      } catch (error) {
        console.error("解析失敗嚕: ", error);
      }
    }
  }, [toOrder]);

  // const
  // setParsedToOrder((prev) => [...prev, ...plane.map((item) => item)]);

  // useEffect(() => {
  //   if (listData && parsedToOrder && plane) {
  //     const cartContent = listData.rows.filter((item) =>
  //       parsedToOrder.some((v) => v.p_albums_id === item.p_albums_id)
  //     );
  //     const updatedCartContent = cartContent.map((item) => {
  //       const matchingItem = parsedToOrder.find((v) => v.p_albums_id === item.p_albums_id);

  //       if (matchingItem) {
  //         // 這裡將 p_cart_img_filename 從 parsedToOrder 加入到 cartContent
  //         return { ...item, p_cart_img_filename: matchingItem.p_cart_img_filename, p_cart_quantity: matchingItem.p_cart_quantity };
  //       }

  //       return item;
  //     });

  //     setNewcart((v)=> [...updatedCartContent, ...plane.map((item) => item)])

  //     // console.log("有沒有阿1: ", img);
  //     console.log("有沒有newcart: ", newcart);
  //     // console.log(parsedToOrder);

  //   }
  // }, [listData, parsedToOrder, plane, newcart]);

  // 寫進訂單資料庫
  const handlePostToOrderDB = () => {
    console.log("檢查 parsedToOrder: ", parsedToOrder);
    // console.log("檢查 newcart: ", newcart);
    console.log("檢查 formData: ", formData);
    console.log("檢查 totalAmount: ", totalAmount);
    console.log("檢查 orderNumber: ", orderNumber);
    if (parsedToOrder.length > 0 && formData && totalAmount && orderNumber) {
      // if (newcart.length > 0 && formData && totalAmount && orderNumber) {
      // 訂單本人
      const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      const orderData = {
        userId: parsedToOrder[0].user_id, // 假設所有項目屬於同一個 user_id
        totalAmount: totalAmount,
        // userId: newcart[0].user_id, // 假設所有項目屬於同一個 user_id
        // totalAmount: item.p_cart_price * item.p_cart_quantity || item.f_plan_amount * 1,
        shippingAddress: formData.address,
        shippingFee: 80,
        paymentStatus: "已付款",
        orderStatus: "準備中",
        phone: formData.phone,
        email: formData.email,
        orderNumber: orderNumber,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };

      //訂單細項
      const orderItemsData = parsedToOrder.map((item) => ({
        orderId: null,
        // f_plan_id: item.f_plan_id,
        albumsId: item.p_albums_id,
        totalAmount: item.p_cart_price * item.p_cart_quantity,
      }));

      // console.log("發送訂單資料: ", orderData);
      // console.log("發送訂單資料: ", orderItemsData);

      // 發送 POST 請求將資料儲存到購物車
      axios
        .post("http://localhost:3005/api/addToOrder", {
          orderData,
          orderItemsData,
        })
        .then((response) => {
          console.log("Item added to order", response.data);
          const pid = parsedToOrder.map((v) => v.p_albums_id);
          cleanTheCart(parsedToOrder[0].user_id, pid);
          setCartItems([]); // 清空購物車
        })
        .catch((error) => {
          console.error("Error adding item to order", error);
        });
    }
  };

  const handleGoCheckOut = () => {
    const canGo =
      !errors.name &&
      !errors.phone &&
      !errors.email &&
      !errors.address &&
      formData.payment &&
      formData.payment !== "";
    if (canGo) {
      handlePayment();
      handlePostToOrderDB();
      console.log("發送!");
    } else {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1500);
    }
  };

  const handlePayment = () => {
    const paymentProducts = parsedToOrder.map((item) => ({
      productName: item.name,
      quantity: item.p_cart_quantity,
      price: Math.floor(item.p_cart_price),
    }));

    console.log("結帳商品資訊:", paymentProducts);

    const productsParam = encodeURIComponent(JSON.stringify(paymentProducts));

    setTimeout(() => {
      router.push({
        pathname: "http://localhost:3002/payment",
        query: { products: productsParam },
      });
    }, 1500);
  };

  const cleanTheCart = async (id, pid) => {
    console.log("清除購物車 userID: ", id);
    console.log("清除購物車 pid: ", pid);
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/cleanFromCart/${id}?pid=${pid.join(",")}`
      );
      console.log("購物車打掃完畢: ", response.data);
    } catch (error) {
      console.error("打掃失敗", error);
    }
  };

  // useEffect(() => {
  //   console.log("來了嗎: ", plane);
  //   console.log("你到底listData? ", listData);
  //   console.log("觀察parsedToOrder: ", parsedToOrder);
  // }, [parsedToOrder, listData, plane]);

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
                <span className={style.procedure}>1</span>購物車
              </li>
              <li>
                <span className={`${style.procedure} ${style.proceduring}`}>
                  2
                </span>
                結帳
              </li>
              <li>
                <span className={style.procedure}>3</span>結帳完成
              </li>
            </ul>
          </div>

          {/* 購買細項 */}
          {parsedToOrder.map((v, i) => {
            {
              /* {newcart && newcart.map((v, i) => { */
            }
            return (
              <div className={style.checkoutcontainer} key={i}>
                <div className={style.checkoutcontainer1}>
                  <div className={style.albumbox}>
                    <img
                      // /Liam/01/05.jpg
                      // ppcx100/ppc027-(1).jpg
                      // src={v.p_cart_img_filename? `/${v.p_cart_img_filename}` : `${v.f_plan_picture}`}
                      src={`/${v.p_cart_img_filename}`}
                      alt=""
                      className={style.albumpics}
                    />
                  </div>
                  {listData &&
                    listData.rows
                      .filter((id) => id.p_albums_id === v.p_albums_id)
                      .map((v, i) => {
                        return (
                          <div className={style.checkoutdescriptions} key={i}>
                            <div>
                              <h4 className={style.descriptionstitle}>
                                {v.p_albums_title}
                                {/* {v.p_albums_title || v.f_plan_title} */}
                              </h4>
                              <div className={style.descriptionsalbumname}>
                                {v.p_albums_artist}
                                {/* {v.p_albums_artist || v.f_plan_content} */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>

                <div className={style.checkoutdirectorybox}>
                  {/* <div className={style.checkoutprice}>$549</div> */}
                  <ul className={style.checkoutdirectory}>
                    <li>單價</li>
                    <li>數量</li>
                    <li>總價</li>
                  </ul>
                  <ul className={style.checkoutdirectory}>
                    <li>${parseInt(v.p_cart_price)}</li>
                    <li>{v.p_cart_quantity}</li>
                    <li>${(v.p_cart_price * v.p_cart_quantity).toLocaleString()}</li>
                  </ul>
                </div>
              </div>
            );
          })}

          {/* seperation line */}
          <div className={style.seperationline}></div>

          {/* payment and address confirming */}

          <div className={style.bottomcontainbox}>
            <div className={style.paymentandaddress}>
              <div className={style.paymentleftside}>
                <div className={style.payaddresstitle}>選擇地址及付款方式</div>
                <div className={style.PandAdirectory}>
                  <ul className={style.padirectory01}>
                    <li className={style.item} onClick={handleFillField}>收件姓名</li>
                    <li className={style.item}>聯絡電話</li>
                    <li className={style.item}>電子郵件</li>
                    <li className={style.item}>送貨方式</li>
                    <li className={style.item}>填入地址</li>
                    <li className={style.item}>付款方式</li>
                  </ul>
                  <ul className={style.padirectory}>
                    <li className={style.inputGroup}>
                      <input
                        type="text"
                        name="name"
                        placeholder="請填入中文姓名"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? style.redname : style.texts}
                      />
                      {errors.name && (
                        <span className={`${style.error} ${style.errorname}`}>
                          {errors.name}
                        </span>
                      )}
                    </li>
                    <li className={style.inputGroup}>
                      <input
                        type="text"
                        name="phone"
                        placeholder="請輸入連絡電話"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? style.redphone : style.texts}
                      />
                      {errors.phone && (
                        <span className={`${style.error} ${style.errorphone}`}>
                          {errors.phone}
                        </span>
                      )}
                    </li>
                    <li className={style.inputGroup}>
                      <input
                        type="text"
                        name="email"
                        placeholder="請輸入電子郵件"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? style.redemail : style.texts}
                      />
                      {errors.email && (
                        <span className={`${style.error} ${style.erroremail}`}>
                          {errors.email}
                        </span>
                      )}
                    </li>
                    <li className={style.inputGroup}>宅配</li>
                    <li className={style.inputGroup}>
                      <input
                        type="text"
                        name="address"
                        placeholder="請輸入地址"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? style.redaddress : style.texts}
                      />
                      {errors.address && (
                        <span
                          className={`${style.error} ${style.erroraddress}`}
                        >
                          {errors.address}
                        </span>
                      )}
                    </li>
                    <li>
                      <select
                        name="payment"
                        value={formData.payment}
                        onChange={handleChange}
                        className={style.inputGroup}
                      >
                        <option value="" disabled selected>
                          請選擇
                        </option>
                        <option value="cashondelivery">貨到付款</option>
                        <option value="debitcard">Line Pay</option>
                      </select>
                      {errors.payment && (
                        <span
                          className={`${style.error} ${style.errorpayment}`}
                        >
                          {errors.payment}
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className={style.finalcheck}>
                <div className={style.finalchecktitle}>結帳資訊</div>
                <div className={style.finalcheckbox}>
                  <div className={style.finalcheckdirectorybox}>
                    <ul className={style.finalcheckdirectory}>
                      <li>小計</li>
                      <li>運費</li>
                    </ul>
                    <ul className={style.finalcheckdirectory}>
                      <li>${(totalAmount).toLocaleString()}</li>
                      <li>$80</li>
                    </ul>
                  </div>

                  <div className={style.paymentseperationline}></div>

                  <div className={style.finaltotalbox}>
                    <div className={style.finaltotal}>
                      <div>合計</div>
                      <div>${(totalAmount + 80).toLocaleString()}</div>
                    </div>
                    {/* <Link
                      href={
                        showModal
                          ? ""
                          : {
                              pathname: "/George/cart/products-completed-page",
                              query: { orderNumber: orderNumber },
                            }
                      }
                    > */}
                    <BlackWBtns
                      type="2"
                      onClick={handleGoCheckOut}
                      className={`${style.blackBtn}`}
                    >
                      前往結帳
                    </BlackWBtns>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderModal showModal={showModal} />
    </>
  );
}
