import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdArrowForwardIos } from "react-icons/md";
import Items2 from "./items2";
import style from "./products-recommendation.module.css";
import useFetchDB from "../hooks/usefetchDB";

export default function ProductsRecommendation() {
  const { listData, albumsimg, genres } = useFetchDB();




  return (
    <>
      <div className={style.carouselSize}>
        <h3
          style={{
            fontWeight: "bold",
            borderBottom: "1.5px solid rgba(20, 255, 0, 1)",
            paddingBottom: "0.5em 0em 0.5em 0em",
            margin: "0.5em 0em 0.5em 0em",
          }}
        >
          本日推薦專輯
          <MdArrowForwardIos style={{ fontSize: "20px", marginLeft: "5px" }} />
        </h3>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={1500}
          centerMode={false}
          // className="carouselSize"
          // containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          // itemClass="carouselSize"
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={true}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3,
              partialVisibilityGutter: 40,
            },
            tablet: {
              breakpoint: { max: 1024, min: 600 },
              items: 2,
              partialVisibilityGutter: 30,
            },
            mobile: {
              breakpoint: { max: 600, min: 0 },
              items: 1,
              partialVisibilityGutter: 20,
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
          {listData.rows.map((album, i) => {
            const albumImages = albumsimg[album.p_albums_id];
            return (
              <Items2
                key={album.p_albums_id}
                description={album.p_albums_description}
                headline={album.p_albums_title}
                image={
                  albumImages && albumImages[0]
                    ? albumImages[0].p_productsimg_filename
                    : ""
                }
                albumsid={album.p_albums_id}
                singer={album.p_albums_artist}
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
