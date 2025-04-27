import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import TagSelector from '../components/TagSelector.jsx';
import styles from '../styles/NewPost.module.css';
import MapSelectorButton from '../components/MapSelectorButton.jsx';
import MapPickerModal from '../components/MapPickerModal.jsx';

const tagOptions = ['thrift', 'events', 'on-campus', 'food', 'arts', 'shop'];

export default function NewPost({ addPost }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const navigate = useNavigate();

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMapSelect = (coords) => {
    setLocation(coords);
    setShowMapPicker(false);
  };

  const handleCancelMap = () => {
    setShowMapPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({
      title: title.trim(),
      description: description.trim(),
      tags: selectedTags,
      replies: [],
      colorClass: 'postColor5',
      photo: photoPreview,
      time: "Not Available",
      coords: location ? [location.lng, location.lat] : [],
    });
    navigate('/forum');
  };

  const isSubmitDisabled = !title.trim() || !description.trim();

  return (
    <>
      <Navbar />
      <form className={styles.newPostContainer} onSubmit={handleSubmit}>
        <div className={styles.titleRow}>
          <label htmlFor="post-title">Post Title:</label>
          <input
            id="post-title"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
          />
        </div>

        <TagSelector
          tagOptions={tagOptions}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />

        <div className={styles.inputRow}>
          <div className={styles.imageUpload}>
            <label htmlFor="photo-upload" className={styles.mapButton}>
              {photoPreview ? 'Change Photo' : 'Upload Photo'}
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}
          </div>
          <div className={styles.textBox}>
            <label htmlFor="description">Tell us what you have to say!</label>
            <textarea
              id="description"
              placeholder="Enter text here ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.mapRow}>
          <label>Location</label>
          <MapSelectorButton
            location={location}
            onClick={() => setShowMapPicker(true)}
            className={styles.mapButton}
          />
          {location && (
            <div className={styles.locationInfo}>
              Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
            </div>
          )}
        </div>

        {showMapPicker && (
          <MapPickerModal
            onSelect={handleMapSelect}
            onCancel={handleCancelMap}
          />
        )}

        <div className={styles.submitRow}>
          <button
            type="submit"
            className={styles.postButton}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
