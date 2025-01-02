import React from 'react'
import styles from './logo.module.css'

export default function Logo({ type, onClick, }) {
  return (
    <div className={styles[`logo-${type}`]}>
      <img src='/logo.svg' className={styles["img"]}></img>
      <p className={styles[`p-${type}`]}>Guava VIbes</p>
    </div>
     
  )
}
