import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./list.module.css";

const ImageCarousel = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [projects, setProjects] = useState([]);
  const [plane, setPlane] = useState([]);

  const containerRef = useRef(null);
  const calculateProjectTotals = (planes, projectId) => {
    if (!planes?.length || !projectId) return 0;

    // 使用 f_project_list 匹配 f_project_id
    const projectPlanes = planes.filter(
      (p) => Number(p.f_project_list) === projectId
    );

    return projectPlanes.reduce((sum, plane) => {
      const planAmount = Number(plane.f_plan_amount) || 0;
      const planPeople = Number(plane.f_plan_people) || 0;
      return sum + planAmount * planPeople;
    }, 0);
  };

  const calculateProjectPeople = (planes, projectId) => {
    if (!planes?.length || !projectId) return 0;

    // 使用 f_project_list 匹配 f_project_id
    const projectPlanes = planes.filter(
      (p) => Number(p.f_project_list) === projectId
    );

    return projectPlanes.reduce(
      (sum, plane) => sum + (Number(plane.f_plan_people) || 0),
      0
    );
  };

  // const images = [
  //   {
  //     src: "/George/products-images-940px/products-(61).jpg",
  //     title: "Fragments of Youth",
  //     tag1: "Dreams",
  //     tag2: "Broken Wings",
  //     tag3: "Electronic"
  //   },
  //   {
  //     src: "/George/products-images-940px/products-(62).jpg",
  //     title: "Fragments of Youth",
  //     tag1: "Dreams",
  //     tag2: "Broken Wings",
  //     tag3: "Electronic"
  //   },
  //   {
  //     src: "/George/products-images-940px/products-(63).jpg",
  //     title: "Fragments of Youth",
  //     tag1: "Dreams",
  //     tag2: "Broken Wings",
  //     tag3: "Electronic"
  //   },
  //   {
  //     src: "/George/products-images-940px/products-(64).jpg",
  //     title: "Fragments of Youth",
  //     tag1: "Dreams",
  //     tag2: "Broken Wings",
  //     tag3: "Electronic"
  //   },
  //   {
  //     src: "/George/products-images-940px/products-(65).jpg",
  //     title: "Fragments of Youth",
  //     tag1: "Dreams",
  //     tag2: "Broken Wings",
  //     tag3: "Electronic"
  //   }
  // ];

  const CARD_WIDTH = 260;
  const CARD_GAP = 63;

  useEffect(() => {
    const fetchNew = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/fundraiser/projectsNew"
        );
        const data = await response.json();
        console.log(data);

        setProjects(data.rows);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    const fetchPlane = async () => {
      try {
        if (!router.isReady) return;
        const response = await fetch(`http://localhost:3005/fundraiser/plane`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.rows && Array.isArray(result.rows)) {
          // 處理數據，確保 f_project_list 是數字類型
          const processedPlanes = result.rows.map((plane) => ({
            ...plane,
            f_project_list: Number(plane.f_project_list),
          }));
          setPlane(processedPlanes); // 設置處理後的數據
          console.log("Processed planes:", processedPlanes);
        }
      } catch (error) {
        console.error("Error fetching plane data:", error);
      }
    };
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const visibleCards = Math.floor(containerWidth / (CARD_WIDTH + CARD_GAP));
      const maxScrollIndex = projects.length - visibleCards;
      setMaxScroll(Math.max(0, maxScrollIndex));
    }
    fetchNew();
    fetchPlane();
  }, [projects.length]);

  const nextSlide = () => {
    if (currentIndex < maxScroll) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  
useEffect(()=>{
  console.log("圖片爹斯", projects)
}, [projects])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} ref={containerRef}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${
              currentIndex * (CARD_WIDTH + CARD_GAP)
            }px)`,
          }}
        >
          {projects.map((image, index) => {
            const projectTotal = calculateProjectTotals(
              plane,
              image.f_project_id
            );
            const projectPeople = calculateProjectPeople(
              plane,
              image.f_project_id
            );
            const progressPercentage = Math.min(
              (projectTotal / Number(image.f_project_amount)) * 100,
              100
            );
            const formattedDate = new Date(image.f_project_current).toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return (
              <div key={index} className={styles.card}>
                <div className={styles.cardInner}>
                  <a
                    href={`/Liam/detail?project=${image.f_project_id}`}
                    className={`card${index}`}
                  >
                    <img
                      src={image.f_project_picture}
                      alt={image.title}
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <h5 className={styles.title}>{`+${image.f_project_title}`}</h5>
                      <div className={styles.tags}>
                        <span className={styles.tag}>{image.f_tag}</span>
                        <span className={styles.date}>{formattedDate}</span>
                      </div>
                        
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressIndicator} style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className={`${styles.button} ${styles.buttonLeft} ${
          currentIndex === 0 ? styles.buttonDisabled : ""
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={nextSlide}
        disabled={currentIndex >= maxScroll}
        className={`${styles.button} ${styles.buttonRight} ${
          currentIndex >= maxScroll ? styles.buttonDisabled : ""
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ImageCarousel;
