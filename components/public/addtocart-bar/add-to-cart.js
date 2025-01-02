import styles from "./add-to-cart.module.css";
import { FaHandPointRight } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import Logo from "../logo";
import Link from "next/link";
import useFetchDB from "@/components/George/hooks/usefetchDB";
import {
  CartProvider,
  useCartDetail,
} from "@/components/George/context/cartdetail-provider";

export const AddToCartBar = () => {
  const { handleAddtoCart } = useCartDetail();
  const [atBottom, setAtBottom] = useState(false);
  const { memAuth } = useFetchDB();

  useEffect(() => {
    const comparingScroll = () => {
      const scrollDistency = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollDistency + windowHeight == documentHeight) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }
    };

    window.addEventListener("scroll", comparingScroll);

    return () => {
      window.removeEventListener("scroll", comparingScroll);
    };
  }, []);

  const handleAuth = () => {
    if (!memAuth) {
      alert("請先登入會員才能進行贊助！");
      const targetUrl = encodeURIComponent(
        `/George/cart/${memAuth ? memAuth.id : ""}`
      );
      window.location = `http://localhost:3000/member/login?redirect=${targetUrl}`;
      return;
    } else {
      window.location = `http://localhost:3000/George/cart/${memAuth.id}`;
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className={`${styles["cart-icon-container"]}`}>
        <div className={styles["cart-icon"]}>
          <BsCart4 size={48} />
        </div>
        <div className={styles.bigwordsandlogo}>
          <div className={`${styles["cart-expanded"]}`}>
            <div className={styles["frame"]}>
              <Logo type={2} />
              <div className={styles["bottom-bar-buttons"]}>
                <button
                  className={styles["barbutton-addtocart"]}
                  onClick={handleAddtoCart}
                >
                  <div className={styles["text-wrapper-4"]}>Add to Cart</div>
                </button>
                {/* <Link href={`/George/cart/${memAuth ? memAuth.id : ""}`}> */}
                {/* <Link href={memAuth ? `/George/cart/${memAuth.id}` : `http://localhost:3000/member/login`}> */}
                <Link href={`/George/cart/1`}>
                  <button
                    className={styles["div-wrapper"]}
                    // onClick={handleAuth}
                  >
                    <div className={styles["text-wrapper-4"]}>Cart</div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
