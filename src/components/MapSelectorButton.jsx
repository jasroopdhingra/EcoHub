import React from 'react';
import { Plus } from 'lucide-react';
import styles from '../styles/NewPost.module.css';

const MapSelectorButton = ({ location, onClick }) => {
  return (
    <div className={styles.mapRow}>
      <button
        type="button"
        className={styles.mapButton}
        onClick={onClick}
      >
        <Plus size={16} />
        {location ? "Change location" : "Add a location through Google Maps"}
      </button>
      {location && (
        <span className={styles.locationInfo}>
          ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
        </span>
      )}
    </div>
  );
};

export default MapSelectorButton;
