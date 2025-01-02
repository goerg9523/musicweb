import React, { useRef, useState, useEffect } from "react";
import styles from "./nav.module.css";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";
import { FiCornerRightDown } from "react-icons/fi";

import { ProfileIcons } from "../../profileIcons/ProfileIcons";
import MallList from "./system-list/mall";
import FundraisingList from "./system-list/fundraising";
import MemberList from "./system-list/member";
import Logo from "../../logo";
import { useRouter } from "next/router";
import { useAuth } from "@/Context/auth-context";

export default function NavMobile() {
  const router = useRouter();
  const { auth } = useAuth();
  const [display, setDislay] = useState(false);
  const items = useRef(null);
  const input = useRef(null);

  const [displayMall, setDisplayMall] = useState(false);
  const [displayFundraising, setDisplayFundraising] = useState(false);
  const [displayForum, setDisplayForum] = useState(false);
  const [displayLive, setDisplayLive] = useState(false);
  const [displayMember, setDisplayMember] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);
  let hoverTimeout = useRef(null);

  const [member, setMember] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include", // 攜帶 cookie，確保 session 可以被讀取
        });
        const data = await response.json();
        // console.log(data);

        setMember(data.admin);
        // console.log(data);

        setMember(data.admin);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (member && member.account) {
      // 已登入，跳轉到 /member/blog/{會員帳號}
      router.push(`/member/blog/${member.account}`);
    } else {
      // 未登入，跳轉到 /member/login
      router.push("/member/login");
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.containerTop}>
            <div className={styles.logo}>
              {/* <a href="#"> */}
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
            <div className={styles.iconsContainer}>
              {/* <a href="/member-blog"> */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (auth?.account) {
                    // 如果會員已登入，跳轉到 /member/blog/{會員帳號}
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

              {/* <div className={styles.icon}>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 17V18C9 18.394 9.0776 18.7841 9.22836 19.1481C9.37913 19.512 9.6001 19.8427 9.87868 20.1213C10.1573 20.3999 10.488 20.6209 10.8519 20.7716C11.2159 20.9224 11.606 21 12 21C12.394 21 12.7841 20.9224 13.1481 20.7716C13.512 20.6209 13.8427 20.3999 14.1213 20.1213C14.3999 19.8427 14.6209 19.512 14.7716 19.1481C14.9224 18.7841 15 18.394 15 18V17M18 9C18 12 20 17 20 17H4C4 17 6 13 6 9C6 5.732 8.732 3 12 3C15.268 3 18 5.732 18 9Z"
                    stroke="#686868"
                    strokeWidth="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div> */}
              <div className={styles.icon}>
                <a href="#">
                  <svg
                    className={styles.iconCart}
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
              {/* <a href="#"> */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                <FaBars
                  className={styles.icon}
                  style={{
                    transform: display ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                  onClick={() => {
                    setDislay(!display);
                  }}
                />
              </a>
            </div>
          </div>
          <div className={styles.containerbottom}>
            <ul style={{ display: display ? "block" : "none" }}>
              <li>
                <div className={styles.search}>
                  <input type="text" ref={input} />
                  <span className={styles.right}>
                    <FiSearch />
                  </span>
                </div>
              </li>
              <li
                onClick={() => {
                  setDisplayMember(!displayMember);
                  if (activeIndex === 4) {
                    setActiveIndex(null);
                  } else {
                    setDisplayMall(false);
                    setDisplayFundraising(false);
                    setDisplayForum(false);
                    setDisplayLive(false);
                    setActiveIndex(4);
                  }
                }}
                style={{
                  backgroundColor: activeIndex === 4 ? "#14ff00" : "#fff",
                }}
              >
                <a href="#">
                  <h6>
                    會員
                    <span>
                      {displayMember ? <FiCornerRightDown /> : <FaAngleRight />}{" "}
                    </span>
                  </h6>
                </a>
              </li>
              {displayMember && <MemberList />}
              <li
                onClick={() => {
                  setDisplayMall(!displayMall);
                  if (activeIndex === 0) {
                    setActiveIndex(null);
                  } else {
                    setDisplayFundraising(false);
                    setDisplayMember(false);
                    setDisplayForum(false);
                    setDisplayLive(false);
                    setActiveIndex(0);
                  }
                }}
                style={{
                  backgroundColor: activeIndex === 0 ? "#14ff00" : "#fff",
                }}
              >
                <a href="#">
                  <h6>
                    商城
                    <span>
                      {displayMall ? <FiCornerRightDown /> : <FaAngleRight />}{" "}
                    </span>
                  </h6>
                </a>
              </li>
              {displayMall && <MallList />}
              <li
                onClick={() => {
                  setDisplayFundraising(!displayFundraising);
                  if (activeIndex === 1) {
                    setActiveIndex(null);
                  } else {
                    setDisplayMall(false);
                    setDisplayForum(false);
                    setDisplayLive(false);
                    setDisplayMember(false);
                    setActiveIndex(1);
                  }
                }}
                style={{
                  backgroundColor: activeIndex === 1 ? "#14ff00" : "#fff",
                }}
              >
                <a   href="#"
                onClick={(e) => {
                  e.preventDefault();
                
                    router.push(`/Liam/Fundraising-list`);
                
                }}>
                  <h6>
                    募資
                    <span>
                      {displayFundraising ? (
                        <FiCornerRightDown />
                      ) : (
                        <FaAngleRight />
                      )}{" "}
                    </span>
                  </h6>
                </a>
              </li>
              {/* {displayFundraising && <FundraisingList />} */}
              <li
                onClick={() => {
                  setDisplayForum(!displayForum);
                  if (activeIndex === 2) {
                    setActiveIndex(null);
                  } else {
                    setDisplayMall(false);
                    setDisplayFundraising(false);
                    setDisplayLive(false);
                    setDisplayMember(false);
                    setActiveIndex(2);
                  }
                }}
                style={{
                  backgroundColor: activeIndex === 2 ? "#14ff00" : "#fff",
                }}
              >
                <a href="#">
                  <h6>
                    論壇
                    <span>
                      {displayForum ? <FiCornerRightDown /> : <FaAngleRight />}{" "}
                    </span>
                  </h6>
                </a>
              </li>
              <li
                onClick={() => {
                  setDisplayLive(!displayLive);
                  if (activeIndex === 3) {
                    setActiveIndex(null);
                  } else {
                    setDisplayMall(false);
                    setDisplayFundraising(false);
                    setDisplayForum(false);
                    setDisplayMember(false);
                    setActiveIndex(3);
                  }
                }}
                style={{
                  backgroundColor: activeIndex === 3 ? "#14ff00" : "#fff",
                }}
              >
                <a href="#">
                  <h6>
                    直播
                    <span>
                      {displayLive ? <FiCornerRightDown /> : <FaAngleRight />}{" "}
                    </span>
                  </h6>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
