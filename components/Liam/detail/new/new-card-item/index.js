import React from 'react';
import styles from './new-card-item.module.css';

const NewsCardItem = ({ date, title, description, image, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.date}>{date && new Date(date).toLocaleDateString()}</div>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default NewsCardItem;