import React, { useState } from "react";
import styles from "./mem-fav.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav-liam";
import Heart from "@/components/public/hearts";

const initialFavorites = [
  {
    id: 1,
    name: "Aimyonnnnnn",
    genre: "J-POP",
    image: "/image/img-Jade/aimyon.png",
  },
  {
    id: 2,
    name: "Bimyonnnnnn",
    genre: "Rock",
    image: "/image/img-Jade/aimyon.png",
  },
  {
    id: 3,
    name: "Cimyonnnnnn",
    genre: "Jazz",
    image: "/image/img-Jade/aimyon.png",
  },
  {
    id: 4,
    name: "Dimyonnnnnn",
    genre: "Hip-Hop",
    image: "/image/img-Jade/aimyon.png",
  },
  {
    id: 5,
    name: "Eimyonnnnnn",
    genre: "Classical",
    image: "/image/img-Jade/aimyon.png",
  },
  {
    id: 6,
    name: "Fimyonnnnnn",
    genre: "Classical",
    image: "/image/img-Jade/aimyon.png",
  },
];

const MemberFav = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemove = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== id)
    );
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
                <div key={fav.id} className={styles.favInfo}>
                  <div className={styles.info1}>
                    <div className={styles.favIcon}>
                      <img
                        src={fav.image}
                        alt={`icon-${fav.name}`}
                        className={styles.photo}
                      />
                    </div>
                  </div>
                  <p className={styles.favName}>{fav.name}</p>
<div className={styles["RWD"]}>

<p className={styles.favGenre}>{fav.genre}</p>
                  <div className={styles.favAction}>
                    <Heart
                      size={2}
                      initialActive={true}
                      onClick={() => handleRemove(fav.id)}
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

export default MemberFav;
