import React, { useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ProfileIcons } from "../../profileIcons/ProfileIcons";
import Mall from "../checklist/mall";
import Logo from "../../logo";
import styles from "./nav.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/Context/auth-context";

export default function NavDesktop() {
  const router = useRouter();
  const { auth } = useAuth(); // 使用 useAuth 來檢查會員登入狀態
  const [display, setDislay] = useState(false);
  const items = useRef(null);
  const input = useRef(null);
  const navRef = useRef(null);

  // 導航狀態管理
  const [displayMall, setDisplayMall] = useState(false);
  const [displayFundraising, setDisplayFundraising] = useState(false);
  const [displayForum, setDisplayForum] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [navHeight, setNavHeight] = useState(0);
  const hoverTimeout = useRef(null);

  // 滾動狀態管理
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // 會員狀態管理
  const [member, setMember] = useState(null);

  // 初始化導航欄高度
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        setNavHeight(height);
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  // 統一的滾動處理邏輯
  useEffect(() => {
    let lastScroll = 0;
    let ticking = false;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      // 更新滾動狀態
      setScrolling(currentScroll > 0);
      setScrollTop(currentScroll);

      // 導航欄顯示/隱藏邏輯
      if (currentScroll <= 0) {
        // 在頂部時顯示
        setIsVisible(true);
      } else if (currentScroll > lastScroll && currentScroll > 50) {
        // 向下滾動且超過50px時隱藏
        setIsVisible(false);
      } else if (currentScroll < lastScroll) {
        // 向上滾動時顯示
        setIsVisible(true);
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 獲取會員數據
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include",
        });
        const data = await response.json();
        setMember(data.admin);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 計算導航欄樣式
  const navStyle = {
    transform: `translateY(${isVisible ? '0' : '-100%'})`,
    transition: 'transform 0.3s ease',
    background: `linear-gradient(0deg, rgba(255,255,255,0) 41%, rgba(20,255,0,1) 100%)`,
    // backdropFilter: `blur(${scrolling ? "8px" : "0px"})`,
    // boxShadow: scrolling ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
  };

  return (
    <div className={styles.navWrapper}>
      {/* 占位元素 */}
      <div className={styles.navSpacer} style={{ height: `${navHeight}px` }} />

      {/* 導航欄 */}
      <div ref={navRef} className={styles.wrap} style={navStyle}>
        <div className={styles.container}>
          {/* Logo 區域 */}
          <div className={styles.logo}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              <Logo type={1} />
            </a>
          </div>

          {/* 導航選單 */}
          <ul ref={items} className={styles.nav}>
            {/* 商城選項 */}
            <li
              className={styles.item}
              onMouseEnter={() => {
                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                setDisplayMall(true);
                setDisplayFundraising(false);
                setDisplayForum(false);
                setActiveIndex(0);
              }}
              onMouseLeave={() => {
                hoverTimeout.current = setTimeout(() => {
                  setDisplayMall(false);
                  setActiveIndex(null);
                }, 200);
              }}
  
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/George/product");
                }}
              >
                <div className={styles.top}></div>
                <div className={styles.bottom}>
                  <h6>商城</h6>
                </div>
                
              </a>
              {displayMall && <Mall />}
            </li> 
      
            {/* 募資選項 */}
            <li
              className={styles.item}
              onMouseEnter={() => {
                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                setDisplayFundraising(true);
                setDisplayMall(false);
                setDisplayForum(false);
                setActiveIndex(1);
              }}
              onMouseLeave={() => {
                hoverTimeout.current = setTimeout(() => {
                  setDisplayFundraising(false);
                  setActiveIndex(null);
                }, 200);
              }}
            
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/Liam/Fundraising-list");
                }}
              >
                <div className={styles.top}></div>
                <div className={styles.bottom}>
                  <h6>募資</h6>
                </div>
              </a>
            </li>

            {/* 論壇選項 */}
            <li
              className={styles.item}
            
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/Allen/forum");
                }}
              >
                <div className={styles.top}></div>
                <div className={styles.bottom}>
                  <h6>論壇</h6>
                </div>
              </a>
            </li>

            {/* 直播選項 */}
            <li className={styles.item}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/Allen/stream");
                }}
              >
                <div className={styles.top}></div>
                <div className={styles.bottom}>
                  <h6>直播</h6>
                </div>
              </a>
            </li>
          </ul>

          {/* 搜尋欄 */}
          <div className={styles.search}>
            <input type="text" ref={input} />
            <span
              className={styles.right}
              onClick={() => {
                setDislay(!display);
                if (!display) {
                  input.current.style.flexGrow = "1";
                  setTimeout(() => {
                    input.current.style.width = "100px";
                    input.current.style.padding = "5px 5px";
                  }, 10);
                } else {
                  input.current.style.padding = "5px 0px";
                  input.current.style.width = "0px";
                }
              }}
            >
              <FiSearch />
            </span>
          </div>

          {/* 用戶圖示區 */}
          <div className={styles.iconsContainer}>
            {/* 用戶頭像 */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (auth?.account) {
                  // 如果會員已登入，跳轉到 `/member/blog/{會員帳號}`
                  router.push(`/member/blog/${auth.account}`);
                } else {
                  // 如果會員未登入，跳轉到 /member/login
                  router.push("/member/login");
                }
              }}
            >
              {member && member.icon ? (
                <ProfileIcons
                  property1="XXS"
                  className={styles.header}
                  img={
                  member.icon
                    ? `http://localhost:3005${member.icon}`
                    : "/image/img-mem/user-logo000.jpg"
                }
                />
              ) : (
                <ProfileIcons
                  property1="XXS"
                  className={styles.header}
                  img="/icons/icon-usernav.svg"
                />
              )}
            </a>

            {/* <a href="/member-blog"> */}

            {/* </a> */}

            {/* 通知圖示 */}
            <div className={styles.icon}>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path
                    d="M9 17V18C9 18.394 9.0776 18.7841 9.22836 19.1481C9.37913 19.512 9.6001 19.8427 9.87868 20.1213C10.1573 20.3999 10.488 20.6209 10.8519 20.7716C11.2159 20.9224 11.606 21 12 21C12.394 21 12.7841 20.9224 13.1481 20.7716C13.512 20.6209 13.8427 20.3999 14.1213 20.1213C14.3999 19.8427 14.6209 19.512 14.7716 19.1481C14.9224 18.7841 15 18.394 15 18V17M18 9C18 12 20 17 20 17H4C4 17 6 13 6 9C6 5.732 8.732 3 12 3C15.268 3 18 5.732 18 9Z"
                    stroke="black"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* 購物車圖示 */}
            <div className={styles.icon}>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path
                    d="M15.9999 8H17.1596C18.1998 8 19.0663 8.79732 19.1527 9.83391L19.8194 17.8339C19.9165 18.9999 18.9964 20 17.8263 20H6.17348C5.0034 20 4.08322 18.9999 4.18039 17.8339L4.84705 9.83391C4.93344 8.79732 5.79997 8 6.84014 8H7.99988M15.9999 8H7.99988M15.9999 8L15.9999 7C15.9999 5.93913 15.5784 4.92172 14.8283 4.17157C14.0782 3.42143 13.0607 3 11.9999 3C10.939 3 9.9216 3.42143 9.17145 4.17157C8.42131 4.92172 7.99988 5.93913 7.99988 7L7.99988 8M15.9999 8L15.9999 12M7.99988 8L7.99988 12"
                    stroke="black"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}