import React from 'react';
import styles from '../styles/NewPost.module.css';

const GoogleMapPicker = ({ onSelect, onCancel }) => {
  const dummyLocation = { lat: 37.7749, lng: -122.4194 };

  return (
    <div className={styles.mapPickerContainer}>
      <p>Google Map goes here</p>
      <button onClick={() => onSelect(dummyLocation)}>
        Select This Location (SF)
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default GoogleMapPicker;
