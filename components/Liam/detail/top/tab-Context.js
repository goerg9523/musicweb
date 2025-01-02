import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/Context/auth-context"; // 使用 useAuth
import { CartProvider } from "@/components/George/context/cartdetail-provider";
import axios from "axios";

const TabContext = createContext();

export function TabProvider({ children }) {
  
  const { auth } = useAuth(); // 獲取 auth 內容
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [plane, setPlane] = useState([]);
  const [member, setMember] = useState();
  const [planCartItems, setPlanCartItems] = useState([]);
  

  useEffect(() => {
    const fetchPlane = async () => {
      try {
        // 發送請求
        if (!router.isReady) return;

        const { project } = router.query;

        const response = await fetch(
          `http://localhost:3005/fundraiser/plane/1`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        // console.log('API Response:', result);

        // 確認數據存在且是陣列
        if (result.data && Array.isArray(result.data)) {
          setPlane(result.data); // 直接設置API返回的數據
        }
      } catch (error) {
        console.error("Error fetching plane data:", error);
      }
    };
    const fetchData = async () => {
      if (!auth.id) return;

      try {
        const response = await axios.get(
          `http://localhost:3005/member/mem-data/by-id/${auth.id}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        console.log(data);

        if (data.success) {
          const memberData = data.memberData;
          setMember(memberData);
        } else {
          console.warn("未獲取到有效的會員資料");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPlane();
    fetchData();
  }, [router.isReady]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, plane, member, setPlanCartItems, planCartItems }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab 必須在 TabProvider 內使用");
  }
  return context;
}
