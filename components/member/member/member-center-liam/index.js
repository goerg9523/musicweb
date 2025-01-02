import React, { useEffect, useRef, useState } from "react";
import styles from "./member-center.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav-liam";
import MemberInfo from "../mem-info/member-info";
import MemberACC from "../mem-acc/mem-acc";
import MemberPassword from "../mem-password";
import MemberFav from "../mem-fav";
import Mp3Uploader from "@/components/public/mp3-uploader";

import MemIcons from "../mem-icons";



const MemWeb2 = () => {
  const [position, setPosition]=useState(0)
  const move = useRef(null);
  // const handlerMove=(e)=>{

  //     move.current.scrollTo({
  //         top: position,
  //         behavior: "smooth",
  //       });
    
  // }
  useEffect(() => {
    // 當 position 更新時執行滾動操作
    if (move.current) {
      move.current.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  }, [position]); // 將 position 添加到依賴數組


  return (
    <>
      <div className={styles["wrapper"]}>
        <Nav className={styles["nav"]} />

        <div className={styles["container"]}>
          <div className={styles["leftContent"]}>
            <InfoNav setPosition={setPosition}/>
          </div>
          <div className= {styles["rightContent"] } ref={move}>
     
            <MemberInfo />
            <MemberACC />
            <MemberPassword />
            <MemberFav />
            {/* <Mp3Uploader /> */}
          </div>
        </div>

        <div className={styles["footer"]}>Footer</div>
      </div>
    </>
  );
};

export default MemWeb2;
