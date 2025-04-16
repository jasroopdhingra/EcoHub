import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import TagSelector from "../components/TagSelector.jsx";
import ImageUploader from "../components/ImageUploader.jsx";
import MapSelectorButton from "../components/MapSelectorButton.jsx";
import MapPickerModal from "../components/MapPickerModal.jsx";
import styles from '../styles/NewPost.module.css';

const tagOptions = ['thrift', 'events', 'on-campus'];

const NewPost = ({ addPost }) => {
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const navigate = useNavigate();

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleMapSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowMapPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({
      title: 'New Post Title',
      description,
      tags: selectedTags,
      replies: 0,
      photo,
      location,
    });
    navigate('/forum');
  };

  return (
    <>
      <Navbar />
      <div className={styles.newPostContainer}>
        <TagSelector
          tagOptions={tagOptions}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />

        <div className={styles.inputRow}>
          <ImageUploader photo={photo} onPhotoChange={setPhoto} />
          <div className={styles.textBox}>
            <label>Tell us what you have to say!</label>
            <textarea
              placeholder="Enter text here ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <MapSelectorButton
          location={location}
          onClick={() => setShowMapPicker(true)}
        />

        {showMapPicker && (
          <MapPickerModal
            onSelect={handleMapSelect}
            onCancel={() => setShowMapPicker(false)}
          />
        )}

        <div className={styles.submitRow}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.postButton}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default NewPost;
