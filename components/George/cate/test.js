import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './test.module.css';

const ImageGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  
  const thumbnailsToShow = 3;

  const handlePrevThumbnails = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const handleNextThumbnails = () => {
    setStartIndex(Math.min(images.length - thumbnailsToShow, startIndex + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.container}>
      {/* Main image display */}
      <div className={styles.mainImageContainer}>
        {images[currentIndex] && (
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || 'Gallery image'}
            className={styles.mainImage}
          />
        )}
      </div>

      {/* Thumbnail carousel */}
      <div className={styles.carouselContainer}>
        {/* Left navigation button */}
        <button
          onClick={handlePrevThumbnails}
          disabled={startIndex === 0}
          className={styles.navButton}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Thumbnails container */}
        <div className={styles.thumbnailsWrapper}>
          <div 
            className={styles.thumbnailsSlider}
            style={{
              transform: `translateX(-${startIndex * (100 / thumbnailsToShow)}%)`
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnailContainer} ${
                  currentIndex === index ? styles.thumbnailContainerActive : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right navigation button */}
        <button
          onClick={handleNextThumbnails}
          disabled={startIndex >= images.length - thumbnailsToShow}
          className={styles.navButton}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;