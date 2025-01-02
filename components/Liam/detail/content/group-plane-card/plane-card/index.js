import React from 'react';
import styles from './card.module.css';


const PlaneCard = ({ 
  onSelect = () => {}, 
  e = {
    f_plan_amount: 0,
    f_plan_picture: '',
    f_plan_title: '',
    f_plan_content: '',
    f_plan_people: 0
  },
  member 

}) => {
  
  const handleSelect = () => {

    
    if (!member ) {
      alert('請先登入會員才能進行贊助！');
      window.location='http://localhost:3000/member/login'
      return;
    }

    const planData = {
      type: '優惠方案',
      name: e.f_plan_title,
      price: e.f_plan_amount
    };
    
    onSelect(planData);
  };

  return (
    <div className={styles.card}>
      <h5 className={styles.priceSection}>
        <span className={styles.price}>${e.f_plan_amount}</span>
      </h5>

      <div className={styles.imageContainer}>
        <img
          src={e.f_plan_picture}
          alt={e.f_plan_title}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{e.f_plan_title}</h3>

        <div className={styles.description}>
          <ul className={styles.list}>
            <li className={styles.info}>{e.f_plan_content}</li>
          </ul>
        </div>
        <div className={styles.footer}>
          <span className={styles.stats}>幫助人次 • {e.f_plan_people}</span>
          <button 
            className={styles.button}
            onClick={handleSelect}
          >
            贊助專案 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaneCard;