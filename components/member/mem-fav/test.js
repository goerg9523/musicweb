import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./mem-fav.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav-liam";
import Heart from "@/components/public/hearts";

const MemberFavTest = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/favorites");
        setFavorites(response.data); // 假設後端返回的資料結構符合需求
      } catch (error) {
        console.error("無法取得收藏資料", error);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/api/favorites/${id}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.m_favorite_id !== id)
      );
    } catch (error) {
      console.error("無法移除收藏項目", error);
    }
  };

  return (
    <>
      {/* <Nav /> */}
      <div className={styles["member-fav"]}>
        <div className={styles["container"]}>
          {/* <div className={styles["favNav"]}>
            <InfoNav />
          </div> */}
          <div className={styles.favMain}>
            <h5 className={styles.mainTitle}>收藏名單</h5>
            <div className={styles.mainBody}>
              {favorites.map((fav) => (
                <div key={fav.m_favorite_id} className={styles.favInfo}>
                  <div className={styles.info1}>
                    <div className={styles.favIcon}>
                      <img
                        src={fav.m_image}
                        alt={`icon-${fav.m_product_name}`}
                        className={styles.photo}
                      />
                    </div>
                  </div>
                  <p className={styles.favName}>{fav.m_product_name}</p>
                  <div className={styles["RWD"]}>
                    <p className={styles.favGenre}>{fav.m_genre}</p>
                    <div className={styles.favAction}>
                      <Heart
                        size={2}
                        initialActive={true}
                        onClick={() => handleRemove(fav.m_favorite_id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberFavTest;
