import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CateContext = createContext();

export const CateProvider = ({ children }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(false);
  const [keyWord, setKeyWord] = useState([]);
  const [searchStatus, setSearchStatus] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  // const handleCategoryClick = async (genres) => {
  //   setLoading(true);
  //   setKeyWord([]);
  //   setSearchStatus(false);
  //   setVisibleItems(8);
  //   try {
  //     console.log("Sending genres:", genres);
  //     const response = await axios.post(
  //       "http://localhost:3005/api/postGenres",
  //       { genres }
  //     );
  //     // console.log("Response received:", response.data);
  //     setAlbumData(response.data); // 設定接收到的專輯資料
  //   } catch (error) {
  //     console.error("Error fetching albums:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCategoryClick = (e) => {
    // console.log(e);
    const categoryName = e.target.innerText; 
    // 這裡處理純數據，而不是整個 DOM 元素
    fetch('http://localhost:3005/api/postGenres', {
      method: 'POST',
      body: JSON.stringify({ category: categoryName }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <CateContext.Provider
      value={{
        handleCategoryClick,
        loading,
        keyWord,
        searchStatus,
        albumData,
        visibleItems,
        setVisibleItems,
        setLoading,
        setKeyWord,
      }}
    >
      {children}
    </CateContext.Provider>
  );
};

// const [visibleItems, setVisibleItems] = useState(8);
// const [loading, setLoading] = useState(false);
// const [keyWord, setKeyWord] = useState([]);
// const [searchStatus, setSearchStatus] = useState(false);
// const [albumData, setAlbumData] = useState([]);

export const useCate = () => useContext(CateContext);
