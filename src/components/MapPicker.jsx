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
        const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(coords);
      }
    } catch (err) {
      setError('Error fetching coordinates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mapPickerContainer}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter an address"
        className={styles.searchBox}
      />
      <button onClick={handleGeocode} disabled={loading}>
        {loading ? 'Searching...' : 'Lookup Coordinates'}
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {position && (
        <div className={styles.result}>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lng}</p>
        </div>
      )}

      <div className={styles.buttons}>
        <button
          onClick={() => position && onSelect(position)}
          disabled={!position}
        >
          Select Coordinates
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}