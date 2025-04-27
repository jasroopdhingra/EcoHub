import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import styles from '../styles/Forum.module.css';
import { useNavigate } from 'react-router-dom';

export default function ForumPostCard({ post }) {
  const repliesCount = post.replies?.length || 0;
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const toggleReplies = (e) => {
    e.preventDefault();
    setShowReplies((prev) => !prev);
  };

  const handleFindOnMap = () => {
    navigate('/map', { state: { selectedPost: post } });
  };

  let imageSrc = null;
  if (post.photo) {
    imageSrc = post.photo;
  } else if (post.img) {
    try {
      imageSrc = require(`../assets/${post.img}`);
    } catch (err) {
      console.warn(`Could not load image ${post.img}:`, err);
    }
  }

  return (
    <div className={styles.postCard}>
      {imageSrc && (
                <div
                  className={styles.postImageContainer}
                  onClick={() => setLightboxOpen(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={imageSrc}
                    alt={post.title}
                    className={styles.postImage}
                  />
          </div>
      )}
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postDesc}>{post.description}</p>

      <div className={styles.postFooter}>
        <div className={styles.infoRow}>
          <button
            type="button"
            className={styles.link}
            onClick={handleFindOnMap}
          >
            <MapPin size={14} />
            Find on map
          </button>

          <div className={styles.postTags}>
            {post.tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {repliesCount > 0 && (
          <button
            type="button"
            className={styles.repliesButton}
            onClick={toggleReplies}
          >
            {showReplies ? 'Hide replies ↑' : `${repliesCount} replies ↓`}
          </button>
        )}
      </div>
            {lightboxOpen && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLightboxOpen(false)}
        >
          <div className={styles.lightboxContent}>
            <button
              className={styles.lightboxClose}
              onClick={() => setLightboxOpen(false)}
            >
              ×
            </button>
            <img
              src={imageSrc}
              alt={post.title}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
      {showReplies && (
        <div className={styles.replyContainer}>
          {post.replies.map((reply, idx) => (
            <div key={idx} className={styles.replyCard}>
              <p>{reply.text}</p>
            </div>
          ))}
        </div>
      )}
      <hr className={styles.divider} />
    </div>
  );
}