import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import TagSelector from '../components/TagSelector.jsx';
import ImageUploader from '../components/ImageUploader.jsx';
import MapSelectorButton from '../components/MapSelectorButton.jsx';
import MapPickerModal from '../components/MapPickerModal.jsx';
import styles from '../styles/NewPost.module.css';

const tagOptions = ['thrift', 'events', 'on-campus'];

export default function NewPost({ addPost }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const navigate = useNavigate();

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
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
      replies: 0,
      photo,
      location,
    });
    navigate('/forum');
  };

  const isSubmitDisabled = !title.trim() || !description.trim();

  return (
    <>
      <Navbar />
      <form className={styles.newPostContainer} onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className={styles.titleRow}>
          <label htmlFor="post-title">Post Title</label>
          <input
            id="post-title"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
          />
        </div>

        {/* Tag Selector */}
        <TagSelector
          tagOptions={tagOptions}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />

        {/* Photo + Description */}
        <div className={styles.inputRow}>
          <ImageUploader photo={photo} onPhotoChange={setPhoto} />
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

        {/* Location Picker */}
        <div className={styles.locationRow}>
          <label>Location</label>
          <MapSelectorButton
            location={location}
            onClick={() => setShowMapPicker(true)}
          />
          {location && (
            <div className={styles.locationPreview}>
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

        {/* Submit */}
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
