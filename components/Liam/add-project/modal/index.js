import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from './modal.module.css';

export default function Modal({ children, onClose }) {
  const modalRef = useRef(null);

  const scrollToTop = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleFormSubmit = () => scrollToTop();
    window.addEventListener("formSubmitted", handleFormSubmit);
    return () => window.removeEventListener("formSubmitted", handleFormSubmit);
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}