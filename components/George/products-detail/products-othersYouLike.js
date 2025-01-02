import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Items1 from "./items2";
import styles from "./products-othersYouLike.module.css";
import { MdArrowForwardIos } from "react-icons/md";

export default function OthersYouLike({youMayLike}) {


  // useEffect(() => {
  //   // console.log("albums:", listData);
  //   console.log("youMayLike:", youMayLike);
  // }, [youMayLike]);
  return (
    <>
      <div className={styles["carousel-container"]}>
        <h4
          style={{
            fontWeight: "bold",
            borderBottom: "1.5px solid rgba(20, 255, 0, 1)",
            paddingBottom: "0.5em",
            margin: "0.5em 0em 0.5em 0em",
          }}
        >
          你可能也喜歡
          <MdArrowForwardIos style={{ fontSize: "20px", marginLeft: "5px" }} />
        </h4>
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
                max: 3000,
                min: 1024,
              },
              items: 5,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
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
          {youMayLike?.filter((v, index) => index % 4 === 0).map((album, i)=>{
              return (
                <Items1
                  key={i}
                  image={album.p_productsimg_filename}
                  singer={album.p_albums_artist}
                  headline={album.p_albums_title}
                  likeid={album.p_albums_id}
                />
              );
            })}
        </Carousel>
      </div>
    </>
  );
}
