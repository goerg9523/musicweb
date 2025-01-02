import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./ProjectForm.module.css";

// 進度條元件
const ProgressBar = ({ currentStep }) => {
  return (
    <div className={styles.progressBar}>
      <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ""}`}>
        建立專案
      </div>
      <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ""}`}>
        專案審查
      </div>
      <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ""}`}>
        專案完成
      </div>
    </div>
  );
};

// 審查進度元件
const ReviewProgress = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewContent}>
        {progress < 100 ? (
          <>
            <div className={styles.loadingIcon}>
              <svg className={styles.spinner} viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
              </svg>
            </div>
            <h2 className={styles.reviewTitle}>審查中...</h2>
          </>
        ) : (
          <div className={styles.successAnimation}>
            <div className={styles.checkmark}>
              <svg className={styles.checkmarkIcon} viewBox="0 0 52 52">
                <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <h2 className={styles.reviewTitle}>審查完成！</h2>
          </div>
        )}
        <div className={styles.reviewProgressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

// 專案表單元件
const ProjectForm = ({ onBack, onSubmit, currentStep ,handleFormData,formData,setFormData}) => {
 
  const [videoPreview, setVideoPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [headerPreview, setHeaderPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = (formData,member) => {
    const errors = {};
    
    if (formData.f_project_name.length < 2 || formData.f_project_name.length > 20) {
      errors.f_project_name = "專案名稱需介於2-20字之間";
    }

    if (!formData.f_tag) {
      errors.f_tag = "請選擇專案類型";
    }

    const amount = Number(formData.f_project_amount);
    if (amount < 1000 || amount > 10000000) {
      errors.f_project_amount = "募資金額需介於1,000-10,000,000之間";
    }

    if (formData.f_project_title.length < 5 || formData.f_project_title.length > 50) {
      errors.f_project_title = "專案標題需介於5-50字之間";
    }

    if (formData.f_project_content.length < 20 || formData.f_project_content.length > 2000) {
      errors.f_project_content = "專案內容需介於20-2000字之間";
    }

    if (!formData.f_project_picture) {
      errors.f_project_picture = "請上傳專案影片";
    }

    if (!formData.top) {
      errors.top = "請上傳封面圖片";
    }

    if (!formData.header) {
      errors.header = "請上傳Header圖片";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      if (name === "f_project_picture") {
        const maxSize = 200 * 1024 * 1024;
        if (file.size > maxSize) {
          setErrors(prev => ({
            ...prev,
            [name]: "視頻文件不能超過200MB"
          }));
          e.target.value = "";
          return;
        }
      } else if (name === "top" || name === "header") {
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          setErrors(prev => ({
            ...prev,
            [name]: "圖片文件不能超過5MB"
          }));
          e.target.value = "";
          return;
        }
      }

      setFormData(prev => ({
        ...prev,
        [name]: file,
      }));
      setErrors(prev => ({ ...prev, [name]: '' }));

      if (name === "f_project_picture") {
        setVideoPreview(URL.createObjectURL(file));
      } else if (name === "top") {
        setImagePreview(URL.createObjectURL(file));
      } else if (name === "header") {
        setHeaderPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表單驗證
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const submitFormData = new FormData();

      for (const key in formData) {
        if (formData[key]) {
          submitFormData.append(key, formData[key]);
        }
      }

      const response = await fetch("http://localhost:3005/fundraiser/projects/create", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "提交失敗");
      }

      [videoPreview, imagePreview, headerPreview].forEach(preview => {
        if (preview) URL.revokeObjectURL(preview);
      });

      window.dispatchEvent(new Event("formSubmitted"));
      onSubmit(result);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message || "提交過程中發生錯誤");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      [videoPreview, imagePreview, headerPreview].forEach(preview => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="f_project_name" onClick={handleFormData}>專案名稱 *</label>
          <input
            type="text"
            id="f_project_name"
            name="f_project_name"
            value={formData.f_project_name}
            onChange={handleInputChange}
            className={errors.f_project_name ? styles.errorInput : ''}
            required
          />
          {errors.f_project_name && (
            <div className={styles.errorMsg}>{errors.f_project_name}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="f_tag">專案類型 *</label>
          <select
            id="f_tag"
            name="f_tag"
            value={formData.f_tag}
            onChange={handleInputChange}
            className={errors.f_tag ? styles.errorInput : ''}
            required
          >
            <option value="">請選擇類型</option>
            <option value="Pop">Pop</option>
            <option value="Soul">Soul</option>
            <option value="Blue">Blue</option>
            <option value="Rock">Rock</option>
          </select>
          {errors.f_tag && (
            <div className={styles.errorMsg}>{errors.f_tag}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="f_project_amount">募資金額 *</label>
          <input
            type="number"
            id="f_project_amount"
            name="f_project_amount"
            value={formData.f_project_amount}
            onChange={handleInputChange}
            className={errors.f_project_amount ? styles.errorInput : ''}
            required
          />
          {errors.f_project_amount && (
            <div className={styles.errorMsg}>{errors.f_project_amount}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="f_project_title">專案標題 *</label>
          <input
            type="text"
            id="f_project_title"
            name="f_project_title"
            value={formData.f_project_title}
            onChange={handleInputChange}
            className={errors.f_project_title ? styles.errorInput : ''}
            required
          />
          {errors.f_project_title && (
            <div className={styles.errorMsg}>{errors.f_project_title}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="f_project_content">專案內容 *</label>
          <textarea
            id="f_project_content"
            name="f_project_content"
            value={formData.f_project_content}
            onChange={handleInputChange}
            className={errors.f_project_content ? styles.errorInput : ''}
            required
          />
          {errors.f_project_content && (
            <div className={styles.errorMsg}>{errors.f_project_content}</div>
          )}
        </div>

        <div className={styles.uploadSection}>
          <div className={styles.formGroup}>
            <label htmlFor="f_project_picture">
              專案影片 * <span className={styles.fileLimit}>(最大200MB)</span>
            </label>
            <input
              type="file"
              id="f_project_picture"
              name="f_project_picture"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
            {errors.f_project_picture && (
              <div className={styles.errorMsg}>{errors.f_project_picture}</div>
            )}
            {videoPreview && (
              <div className={styles.videoPreview}>
                <video controls src={videoPreview} className={styles.previewVideo}>
                  您的瀏覽器不支持影片播放。
                </video>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="top">
              封面圖片 * <span className={styles.fileLimit}>(最大5MB)</span>
            </label>
            <input
              type="file"
              id="top"
              name="top"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {errors.top && (
              <div className={styles.errorMsg}>{errors.top}</div>
            )}
            {imagePreview && (
              <div className={styles.imagePreview}>
                <img src={imagePreview} alt="封面預覽" className={styles.previewImage} />
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="header">
              Header 圖片 * <span className={styles.fileLimit}>(最大5MB)</span>
            </label>
            <input
              type="file"
              id="header"
              name="header"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {errors.header && (
              <div className={styles.errorMsg}>{errors.header}</div>
            )}
            {headerPreview && (
              <div className={styles.imagePreview}>
                <img src={headerPreview} alt="Header 預覽" className={styles.previewImage} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "提交專案"}
          </button>
        </div>
      </form>
    </div>
  );
};

// 成功頁面元件
const SuccessPage = ({ onReturn, handleClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.successPage}>
        <div className={styles.successContent}>
          <h1>專案建立成功！</h1>
          <p>您的專案已經成功建立並通過審核</p>
          <button onClick={handleClose} className={styles.returnButton}>
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};

// 主要系統元件
const ProjectSystem = ({setShowModal,member}) => {
  const [formData, setFormData] = useState({
    f_project_name: "",
    f_tag: "",
    f_project_amount: "",
    f_project_title: "",
    f_project_content: "",
    f_project_picture: null,
    top: null,
    header: null,
  });
  const [currentView, setCurrentView] = useState("form");
  const [currentStep, setCurrentStep] = useState(1);
   
  const handleFormData=()=>{
    setFormData(
      {
        f_project_name: "銀翼殺手",
        f_tag: "Pop",
        f_project_amount: 123454,
        f_project_title: "雨中落淚",
        f_project_content: "當人造記憶在腦海中閃爍我是否真的存在？淚水滑落臉龐卻不知是否為真實的情感奔流的電子血液在人造的血管中奔騰每一次心跳都是程式設計的律動還是靈魂深處的顫慄？檢視著鏡中的倒影找尋著存在的證明記憶如同碎片般零落拼湊不完整的人生拼圖或許答案不在過去而在當下每個感受的瞬間縱使是人工編織的夢此刻的痛楚卻如此真實",
        f_project_picture: null,
        top: null,
        header: null,
      
      })
  }

  const handleFormSubmit = (formData) => {
    setCurrentStep(2);
    setCurrentView("review");
  };

  const handleReviewComplete = () => {
    setCurrentStep(3);
    setTimeout(() => {
      setCurrentView("success");
    }, 1000);
  };

  const handleReturnToMain = () => {
    setCurrentStep(1);
    setCurrentView("main");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.systemContainer}>
      {currentView !== "main" && <ProgressBar currentStep={currentStep} />}

      {currentView === "form" && (
        <ProjectForm
          onBack={handleReturnToMain}
          onSubmit={handleFormSubmit}
          currentStep={currentStep}
          handleFormData={handleFormData}
          formData={formData}
          setFormData={setFormData}
        />
      )}

         
      {currentView === "review" && <ReviewProgress onComplete={handleReviewComplete}   setFormData={setFormData}/>}

      {currentView === "success" && <SuccessPage onReturn={handleReturnToMain} handleClose={handleClose}  setFormData={setFormData}/>}
    </div>
  );
};

export default ProjectSystem;