import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Image as ImageIcon } from 'lucide-react';
import styles from '../styles/NewPost.module.css';
import Navbar from "../components/Navbar.jsx"; 
const tagOptions = ['thrift', 'events', 'on-campus'];

const NewPost = ({ addPost }) => {
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({
      title: 'New Post Title',
      description,
      tags: selectedTags,
      replies: 0,
    });
    navigate('/forum');
  };

  return (
    <>
    <Navbar/>
    <div className={styles.newPostContainer}>
      <div className={styles.tagsRow}>
        <label>Choose a tag:</label>
        {tagOptions.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.active : ''}`}
            type="button"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      
      <div className={styles.inputRow}>
        <div className={styles.imageUpload}>
          <ImageIcon size={48} />
          <span>Add a photo</span>
        </div>

        <div className={styles.textBox}>
          <label>Tell us what you have to say!</label>
          <textarea
            placeholder="Enter text here ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.mapRow}>
        <Plus size={16} />
        <span>Add a location through Google Maps</span>
      </div>

      <div className={styles.submitRow}>
        <button type="submit" onClick={handleSubmit} className={styles.postButton}>
          Submit
        </button>
      </div>
    </div>
    </>
  );
};

export default NewPost;
