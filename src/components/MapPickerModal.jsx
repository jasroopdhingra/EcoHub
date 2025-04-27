import React from 'react';
import AddressPicker from './MapPicker';
import styles from '../styles/NewPost.module.css';

export default function MapPickerModal({ onSelect, onCancel }) {
  return (
    <div className={styles.mapPickerModal}>
      <AddressPicker
        onSelect={onSelect}
        onCancel={onCancel}
      />
    </div>
  );
}
