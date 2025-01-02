import React, { useEffect } from "react";
import style from "./products-activities.module.css";
import Link from "next/link";
import useFetchDB from "../hooks/usefetchDB";

export default function ProductsActivities({ accessToken }) {
  const { listData, albumsimg, genres } = useFetchDB();

  useEffect(()=>{
    console.log("This is listData: ", listData)
  }, [listData])
  return (
    <>
      <div className={style.container}>
        <div className={style["pics-box"]}>
          <div className={style["left-side"]}>
            <div className={style.leftSideImageContainer}> </div>
            {listData &&
              listData.rows.slice(0, 1).map((v, i) => (
                <div key={v.p_albums_id}>
                  <Link
                    href={`/George/product/${v.p_albums_id}`}
                    className={style.linkstyle}
                  >
                    {albumsimg[v.p_albums_id] &&
                      albumsimg[v.p_albums_id][0] && (
                        <img
                          src={
                            albumsimg[v.p_albums_id][0].p_productsimg_filename
                          }
                          alt={`Album ${v.p_albums_id} Image`}
                        />
                      )}
                  </Link>
                  <div className={style["text-box"]}>
                    <div className={style["text-title"]}>
                      <Link
                        href={`/George/product/${v.p_albums_id}`}
                        className={style.linkstyle}
                      >
                        {v.p_albums_artist}
                      </Link>
                    </div>
                    <div className={style["text-description"]}>
                      <Link
                        href={`/George/product/${v.p_albums_id}`}
                        className={style.linkstyle}
                      >
                        {v.p_albums_description}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className={style["right-side"]}>
            {listData &&
              listData.rows.sort(() => Math.random() - 0.5).slice(1, 4).map((v, i) => (
                <div key={v.p_albums_id} className={style["album-container"]}>
                  <Link
                    href={`/George/product/${v.p_albums_id}`}
                    className={style.linkstyle}
                  >
                    {albumsimg[v.p_albums_id] &&
                      albumsimg[v.p_albums_id][0] && (
                        <img
                          src={
                            albumsimg[v.p_albums_id][0].p_productsimg_filename
                          }
                          alt={`Album ${v.p_albums_id} Image`}
                        />
                      )}
                  </Link>
                  <div className={style["text-box-right"]}>
                    <div className={style["text-title-right"]}>
                      <Link
                        href={`/George/product/${v.p_albums_id}`}
                        className={style.linkstyle}
                      >
                        {v.p_albums_artist}
                      </Link>
                    </div>
                    <div className={style["text-description-right"]}>
                      <Link
                        href={`/George/product/${v.p_albums_id}`}
                        className={style.linkstyle}
                      >
                        {v.p_albums_description}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
