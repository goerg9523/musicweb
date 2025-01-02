import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AB_LIST, AB_DEL_DELETE } from "@/config/api-path";

const useFetchDB = () => {
  const [listData, setListData] = useState({ rows: [] });
  const [albumsimg, setAlbumsImg] = useState({});
  const [genres, setGenres] = useState([]);
  const [mdBox, setMdBox] = useState([]);
  const [memData, setMemData] = useState([]);
  const [memAuth, setMemAuth] = useState();
  const router = useRouter();
  const { urid } = router.query;

  // Delete
  const delItem = (p_albums_id) => {
    console.log({ p_albums_id });
    fetch(`${AB_DEL_DELETE}/${p_albums_id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          router.push(location.search, undefined, { scroll: false });
        }
      });
  };

  //抓取會員資料
  useEffect(() => {
    if (!router.isReady || !urid) return;
    const fetchMemUrid = async () => {
      try {
        const responseMemUrData = await axios.get(
          `http://localhost:3005/api/getMem/${urid}`
        );
        setMdBox(responseMemUrData.data);
      } catch {
        console.error("Error fetching genres: ", error);
      }
    };
    fetchMemUrid();
  }, [router.isReady, urid]);

  // fetch mem data
  useEffect(() => {
    const fetchMemData = async () => {
      try {
        const responseMemData = await axios.get(
          `http://localhost:3005/api/getMem`
        );
        setMemData(responseMemData.data);
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };
    fetchMemData();
  }, []);


  useEffect(()=>{
    const fetchMemData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch member data");
        }
        const data = await response.json();
        // console.log(data);
        
        // 確保設置的值不是 undefined
        setMemAuth(data.admin || null);
        // console.log(member);
  
      } catch (error) {
        console.error("Error fetching member data:", error);
        setMemAuth(null); // 發生錯誤時設置為 null
      }
    };
    fetchMemData()
  }, [router.isReady])


  useEffect(() => {
    if (!router.isReady) return;
  
    // 建立取消請求的 token
    const source = axios.CancelToken.source();
  
    const fetchListData = async () => {
      try {
        const response = await axios.get(`${AB_LIST}${location.search}`, {
          cancelToken: source.token,
        });
        const obj = response.data;
  
        if (obj) {
          setListData(obj);
        } else if (obj.redirect) {
          router.push(obj.redirect);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching data", error);
        }
      }
    };
  
    fetchListData();
  
    // 清理函數，用於中止請求
    return () => {
      source.cancel("Component unmounted, request canceled");
    };
  }, [router.isReady, router]);



  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/getGenres");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch album images
  useEffect(() => {
    if (!listData || listData.length === 0) return; // 如果 listData 為空則不執行
    const source = axios.CancelToken.source();
  
    const getImages = async () => {
      try {
        await Promise.all(
          listData.rows.map((album) =>
            axios
              .get(`http://localhost:3005/api/getImages/${album.p_albums_id}`, {
                cancelToken: source.token,
              })
              .then((response) => {
                const imgObj = response.data;
                if (imgObj) {
                  setAlbumsImg((prevAlbumsImg) => ({
                    ...prevAlbumsImg,
                    [album.p_albums_id]: imgObj.images,
                  }));
                }
              })
              .catch((error) => {
                if (axios.isCancel(error)) {
                  console.log("Request canceled");
                } else {
                  console.error("Fetch error:", error);
                }
              })
          )
        );
      } catch (error) {
        console.error("Error in getImages:", error);
      }
    };
  
    getImages();
  
    return () => {
      source.cancel("Component unmounted, image requests canceled");
    };
  }, [listData]);
  

  return { listData, albumsimg, genres, memData, mdBox, memAuth };
};

export default useFetchDB;
