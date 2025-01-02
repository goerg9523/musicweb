import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './main-carousel.module.css';

const DetailMainCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [kvData, setKvData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const nextSlide = () => {
    if (kvData.length === 0) return; // 防止空數組
    setCurrentSlide((prev) => (prev + 1) % kvData.length);
  };

  const prevSlide = () => {
    if (kvData.length === 0) return; // 防止空數組
    setCurrentSlide((prev) => (prev - 1 + kvData.length) % kvData.length);
  };

  useEffect(() => {
    const fetchKv = async () => {
      try {
        if (!router.isReady) return;
        
        const { project } = router.query;
        if (!project) return;

        const response = await fetch(`http://localhost:3005/fundraiser/kv/${project}`);
        const data = await response.json();
        
        if (data.rows && data.rows.length > 0) {
          setKvData(data.rows);
          setCurrentSlide(0); // 重置輪播位置
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKv();
  }, [router.isReady, router.query]);

  // 自動輪播效果
  useEffect(() => {
    if (kvData.length <= 1) return; // 如果只有一張或沒有圖片就不輪播

    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [kvData.length]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (kvData.length === 0) {
    return <div style={{textAlign:'center',height:'50px'}}>暫無廣告</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        {kvData.map((item, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ''
            }`}
            style={{
              display: index === currentSlide ? 'block' : 'none'
            }}
          >
            <img 
              src={item.f_picture_file} 
              alt={`Slide ${index + 1}`} 
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {kvData.length > 1 && ( // 只有多於一張圖片時才顯示控制項
        <div className={styles.controlsContainer}>
          <div className={styles.dotsContainer}>
            {kvData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.activeDot : ''
                }`}
              />
            ))}
          </div>

          <div className={styles.navButtons}>
            <button 
              onClick={prevSlide} 
              className={styles.navButton}
            >
              ←
            </button>
            <button 
              onClick={nextSlide} 
              className={styles.navButton}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMainCarousel;