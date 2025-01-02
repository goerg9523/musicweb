import React, { useState, useRef } from 'react';
import './drag.module.css';

const DragDropUpload = ({ 
  onFileSelect, 
  accept, 
  maxSize,
  label,
  fileType = "檔案",
  preview = null,
  error = "",
  required = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      validateAndProcessFile(files[0]);
    }
  };

  const validateAndProcessFile = (file) => {
    if (maxSize && file.size > maxSize) {
      onFileSelect({ 
        error: `${fileType}不能超過${Math.floor(maxSize / 1024 / 1024)}MB`
      });
      return;
    }
    onFileSelect({ file });
  };

  const renderPreview = () => {
    if (!preview) return null;

    if (accept?.includes('video')) {
      return (
        <div className="preview-container">
          <video controls src={preview} className="preview-video">
            您的瀏覽器不支持影片播放。
          </video>
        </div>
      );
    }
    
    if (accept?.includes('image')) {
      return (
        <div className="preview-container">
          <img src={preview} alt="預覽圖片" className="preview-image" />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="upload-container">
      <label className="upload-label">
        {label} 
        {required && <span className="required-star">*</span>}
        {maxSize && (
          <span className="size-limit">
            (最大 {Math.floor(maxSize / 1024 / 1024)}MB)
          </span>
        )}
      </label>
      
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''} ${error ? 'error' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="file-input"
          accept={accept}
          onChange={handleFileSelect}
          required={required}
        />
        
        <div className="upload-content">
          <svg 
            className={`upload-icon ${isDragging ? 'dragging' : ''}`}
            stroke="currentColor" 
            fill="none" 
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M24 8l-8 8h6v16h4V16h6l-8-8z"
            />
          </svg>
          
          <div className="upload-text">
            <span className="upload-button">
              點擊上傳
            </span>
            {" "}或將檔案拖曳至此
          </div>
          
          <div className="file-types">
            {accept?.split(',').join(', ')}
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {renderPreview()}
    </div>
  );
};

export default DragDropUpload;