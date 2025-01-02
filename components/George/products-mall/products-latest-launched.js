import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Items1 from "./items1";
import styles from "./products-latest-launched.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import useFetchDB from "../hooks/usefetchDB";

export default function ProductsLatestLaunched() {
  const { listData, albumsimg, genres } = useFetchDB();

  return (
    <>
      <div className={styles["carousel-container"]}>
        <h3
          style={{
            fontWeight: "bold",
            borderBottom: "1.5px solid rgba(20, 255, 0, 1)",
            paddingBottom: "0.5em",
            margin: "0.5em 0em 0.5em 0em",
          }}
        >
          新發行
          <MdArrowForwardIos style={{ fontSize: "20px", marginLeft: "5px" }} />
        </h3>
        <div className="latestLaunch"></div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 1800,
                min: 1200,
              },
              items: 6,
              partialVisibilityGutter: 40,
            },
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1801,
              },
              items: 6.5,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 576,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 767,
                min: 577,
              },
              items: 2,
              partialVisibilityGutter: 20,
            },
            laptop: {
              breakpoint: {
                max: 800,
                min: 768,
              },
              items: 2.5,
              partialVisibilityGutter: 20,
            },
            laptop: {
              breakpoint: {
                max: 900,
                min: 801,
              },
              items: 3,
              partialVisibilityGutter: 30,
            },
            laptop: {
              breakpoint: {
                max: 1100,
                min: 901,
              },
              items: 4,
              partialVisibilityGutter: 30,
            },
            laptop: {
              breakpoint: {
                max: 1199,
                min: 1101,
              },
              items: 4.5,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {listData?.rows?.map((v, i) => {
            const albumImages = albumsimg[v.p_albums_id];
            return (
              <Items1
                key={i}
                description={v.p_albums_description}
                headline={v.p_albums_title}
                image={
                  albumImages && albumImages[0]
                    ? albumImages[0].p_productsimg_filename
                    : ""
                }
                albumsid={v.p_albums_id}
              />
            );
          })}
        </Carousel>
      </div>
      <style jsx>
        {`
          .custom-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 2; /* 確保箭頭顯示在 Carousel 之上 */
          }

          .custom-left-arrow {
            left: 10px; /* 靠左側 10px */
          }
        `}
      </style>
    </>
  );
}
