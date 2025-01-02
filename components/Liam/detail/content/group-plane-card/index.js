import PlaneCard from "./plane-card";
import styles from "./group-plane-card.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProductSelector } from "../../../select/index";
import { useAuth } from "@/Context/auth-context"; // 使用 useAuth
import { useTab } from "../../top/tab-Context";

import axios from "axios";


export default function GroupPlaneCard({handleAddtoCart, setPlanCartItems,planCartItems}) {
  const { auth } = useAuth(); // 獲取 auth 內容

  const router = useRouter();
  const { member, plane } = useTab();
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  // const [plane, setPlane] = useState([]);
  // const [member, setMember] = useState()

  const handlePlanSelect = (planData) => {
    setSelectedPlan(plane);
    setShowProductSelector(true);
  };
  useEffect(() => {
    console.log(member, plane);
  }, [member, plane]);
  // useEffect(() => {
  //   const fetchPlane = async () => {
  //     try {
  //       // 發送請求
  //       if (!router.isReady) return;

  //       const { project } = router.query;

  //       const response = await fetch(
  //         `http://localhost:3005/fundraiser/plane/${project}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const result = await response.json();
  //       // console.log('API Response:', result);

  //       // 確認數據存在且是陣列
  //       if (result.data && Array.isArray(result.data)) {
  //         setPlane(result.data); // 直接設置API返回的數據
  //       }
  //     } catch (error) {
  //       console.error("Error fetching plane data:", error);
  //     }
  //   };
  //   const fetchData = async () => {
  //     if (!auth.id) return;

  //     try {
  //       const response = await axios.get(`http://localhost:3005/member/mem-data/by-id/${auth.id}`, {
  //         withCredentials: true,
  //       });
  //       const data = response.data;

  //       if (data.success) {
  //         const memberData = data.memberData;
  //         setMember(memberData);

  //       } else {
  //         console.warn("未獲取到有效的會員資料");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchPlane();
  //   fetchData()

  // }, [router.isReady]);

  if (plane.length == 0) {
    return (
      <div
        className={styles.emptyContainer}
        style={{ textAlign: "center", height: "50px" }}
      >
        暫無專案
      </div>
    );
  }

  if (showProductSelector) {
    return (
      <ProductSelector
        setShowProductSelector={setShowProductSelector}
        selectedPlan={selectedPlan}
        plane={plane}
        handleAddtoCart={handleAddtoCart}
        setPlanCartItems={setPlanCartItems}
        planCartItems={planCartItems}
      />
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {/* {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className={styles.item}>
            <PlaneCard onSelect={handlePlanSelect} />
          </li>
        ))} */}
        {plane.map((e, i) => {
          return (
            <li key={i} className={styles.item}>
              <PlaneCard onSelect={handlePlanSelect} e={e} member={member} />
            </li>
          );
        })}
      </ul>
      {/* {console.log('plane in render:', plane)} */}
    </div>
  );
}
