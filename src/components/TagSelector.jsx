import React from 'react';
import styles from '../styles/NewPost.module.css';

const TagSelector = ({ tagOptions, selectedTags, onToggleTag }) => {
  return (
    <div className={styles.tagsRow}>
      <label>Choose a tag:</label>
      {tagOptions.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.active : ''}`}
          onClick={() => onToggleTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagSelector;
