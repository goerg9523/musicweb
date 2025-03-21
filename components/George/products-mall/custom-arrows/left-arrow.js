import React from 'react'
import style from "./left-arrow.module.css"

export const CustomLeftArrow = ({ onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </div>
);
