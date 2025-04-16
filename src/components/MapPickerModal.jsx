import React from 'react';
import GoogleMapPicker from './GoogleMapPicker';
import styles from '../styles/NewPost.module.css';

const MapPickerModal = ({ onSelect, onCancel }) => {
  return (
    <div className={styles.mapPickerModal}>
      <GoogleMapPicker onSelect={onSelect} onCancel={onCancel} />
    </div>
  );
};

export default MapPickerModal;
