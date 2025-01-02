import React from 'react';
import styles from './title.module.css'
import { IoMdArrowDropright } from "react-icons/io";
export default function FundraisingTitle({text='xxx'}) {
  return (
    <div className={styles.container}>
      <h3>{text}</h3>
      <div className={styles.tip}>
        <span className={styles.circle1}></span>
        <span className={styles.circle2}></span>
        <span className={styles.circle3}></span>
        {/* <p>dwqdw</p> */}
      </div>
    </div>
  )
}
