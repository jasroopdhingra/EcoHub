import React, { useState } from 'react';
import styles from '../styles/NewPost.module.css';

export default function AddressPicker({ onSelect, onCancel }) {
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeocode = async () => {
    if (!address.trim()) {
      setError('Please enter a valid address.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const results = await response.json();
      if (results.length === 0) {
        setError('No results found for this address.');
      } else {
        const { lat, lon } = results[0];
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch {
      setError('Error fetching coordinates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mapPickerContainer}>
      <div className={styles.mapRow}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
          className={styles.searchBox}
        />
        <button
          onClick={handleGeocode}
          disabled={loading}
          className={styles.lookupButton}
        >
          {loading ? 'Searching…' : 'Lookup'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {position && (
        <div className={styles.result}>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lng}</p>
        </div>
      )}

      <div className={styles.mapRow}>
        <button
          onClick={() => position && onSelect(position)}
          disabled={!position}
          className={styles.mapButton}
        >
          Select
        </button>
        <button onClick={onCancel} className={styles.mapButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
