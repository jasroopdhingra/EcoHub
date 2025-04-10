import React, { useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import styles from '../styles/NewPost.module.css';

const ImageUploader = ({ photo, onPhotoChange }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.imageUploader}>
      <div className={styles.imageUpload} onClick={handleClick}>
        {photo ? (
          <img
            src={URL.createObjectURL(photo)}
            alt="Preview"
            className={styles.imagePreview}
          />
        ) : (
          <>
            <ImageIcon size={48} />
            <span>Add a photo</span>
          </>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onPhotoChange(file);
        }}
      />
    </div>
  );
};

export default ImageUploader;
